# (영준) config.py에 AWS S3 정보 기록 후 불러오기
from config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET, AWS_S3_BUCKET_URL
from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS
from io import BytesIO
import boto3
from PIL import Image

#   코드 출처 : https://github.com/GalaxyOverMe/SpotTheDifference_Generator
#   원본 코드에서 사용한 라이브러리
# from wx import *
import cv2
import numpy as np
import random
import os

app = Flask(__name__)
api = Api(app)
CORS(app)

s3 = boto3.client('s3',
                  aws_access_key_id=AWS_ACCESS_KEY_ID,
                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                  region_name=AWS_REGION)

####     **   객체 탐지   **

#   이미지를 (w, h) = (400 x 600) 에 맞는 비율로 변환시킴
#   가로가 긴 이미지라면 가로 = 400, 세로 < 600
#   세로가 긴 이미지라면 가로 < 400, 세로 = 600
#   in:  원본 이미지        (src, ref, dst)
#   out: 크기 정규화된 이미지 (src, ref, dst)
def normalize_size(src, dst, ref, width = 400, height = 600):
    # dst = src.copy()
    w = src.shape[1]
    h = src.shape[0]
    dst_rate = height / width # = 1.5
    rate = h / w              # 이 그림의 비율

    if rate < dst_rate: #가로로 긴 그림일 경우 -> 가로 = 400, 세로 < 600
        src = cv2.resize(src, (width, int(width * rate)))
        ref = cv2.resize(ref, (width, int(width * rate)))
        dst = cv2.resize(dst, (width, int(width * rate)))
        # print("case 1")
    else:               #세로로 긴 그림일 경우 -> 가로 < 400, 세로 = 600
        src = cv2.resize(src, (int(height / rate), height))
        ref = cv2.resize(ref, (int(height / rate), height))
        dst = cv2.resize(dst, (int(height/rate)  , height))
        # print("case 2")
    return src, dst, ref

#   mophologic_edge를 얻는 함수
#   in: src 이미지
#   out: edge 이미지
def get_morphological_edge(src):
    imgBlur = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)  # gray image
    thresh = cv2.threshold(imgBlur, 128, 255, cv2.THRESH_BINARY)[1]
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
    dilate = cv2.morphologyEx(thresh, cv2.MORPH_DILATE, kernel)
    diff = cv2.absdiff(dilate, thresh)
    # edges = 255 - diff
    edges = diff

    return edges

#   contour를 얻는 함수
#  in: edge 이미지, Contour를 저장할이미지
#  out: 퀴즈 후보
def get_contours(edge, imgContour):
    contours, hierarchy =cv2.findContours(edge, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
#    contours, hierarchy = cv2.findContours(canny, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
                        #2번째 매개변수설명         contour 추출 모드 (EXTERNAL:바깥쪽만, TREE:전부,
                        #     LIST : 계층 구조 상관x 추출,
                        #3번째 매개변수설명         contour 근사 방법 (SIMPLE: 꼭짓점 4개만, NONE: 모든 점)
    min_area = 400
    max_area = edge.shape[0] * edge.shape[1] / 8

    ptsCandidate = []
    approxCandidate = []

    for cnt in contours:
        if len(cnt) == 0: continue
        area = cv2.contourArea(cnt) #   윤곽선의 면적
        # print(area)
        if  area < min_area: continue  #최소 크기 제약조건
        cv2.drawContours(imgContour, cnt, -1, (255,0,0), 3)
        peri = cv2.arcLength(cnt, True)     #윤곽선의 길이
        epsilon = 0.02 * peri
        approx = cv2.approxPolyDP(cnt, epsilon, True)
        x, y, w, h = cv2.boundingRect(approx)
        if w*h > max_area: continue     #최대 크기 제약조건

        ptsCandidate.append([x,y,x+w,y+h])
        approxCandidate.append(approx)
    return ptsCandidate,approxCandidate

#   퀴즈 후보로 퀴즈를 출제하는 함수
# pts   : approx를 둘러싸는 직사각형
# approx: contour 폐곡선을 간격을 두고 둘러싼 점
# in:퀴즈 후보(pts와 approx), 최대 퀴즈 개수, 마스크 이미지, 정답 그림
# out:퀴즈 정답 좌표(직사각형 좌표 리턴 [x1, y1, x2, y2])( "주의 :in 퀴즈 개수보다 적을 수 있다")
def quiz(ptsCandidate, approxCandidate, num, imgMask, ref):
    pts = []
    approxs = []
    #   항상 문제가 달라지게
    indexes = np.random.permutation(np.arange(len(ptsCandidate)))    #인덱스를 섞습니다
    cnt = 0
    min_distance = 10

    #   문제들마다 일정한 거리가 있었으면 좋겠어
    for i in indexes:
        if cnt >= num: break

        x1 = ptsCandidate[i][0]
        y1 = ptsCandidate[i][1]
        x2 = ptsCandidate[i][2]
        y2 = ptsCandidate[i][3]

        TOO_CLOSE = False
        #   두 영역 사이의 거리(d)가 너무 가까우면 선택안하겠어
        #                  d가 r1 + r2 + min_distance 보다 작으면
        for j in pts:
            r1 = np.sqrt((x1-x2)**2 + (y1-y2)**2)/2             #   내 r
            r2 = np.sqrt((j[0]-j[2])**2 + (j[1]-j[3])**2)/2     #   pts에 있는 r

            c1 = [(x1+x2)/2, (y1+y2)/2]
            c2 = [(j[0]+j[2])/2, (j[1]+j[3])/2]

            d = np.sqrt((c1[0]-c2[0])**2 + (c1[1]-c2[1])**2)
            if  d  < r1 + r2 +  min_distance:
                TOO_CLOSE = True
                break

        if TOO_CLOSE == True: continue

        approxCandidate[i] = np.int32([approxCandidate[i]])   #   fillpoly에러
        cv2.fillPoly(imgMask, approxCandidate[i], (0,0,0))
        cv2.fillPoly(ref , approxCandidate[i], (255,255,255))

        pts.append([x1,y1,x2,y2])
        approxs.append(approxCandidate[i])
        cnt += 1

    return pts

####     **   퀴즈 전달   **

#   이미지를 중앙에 위치시키는 함수
#   비율을 유지한 채 (w, h) = (400, 600) 인 이미지의 내부가 된다.
#   in: normarlize_size 된 이미지 (src, ref, dst)
#   out: centering 된 이미지(src, ref, dst), 이동한 좌표(x,y)
def centering_image(src, dst, ref, width = 400, height = 600):
    w = src.shape[1]
    h = src.shape[0]

    rate = h/w
    dst_rate = height / width

    src_output = np.zeros((600, 400, 3), dtype = np.uint8)
    ref_output = np.zeros((600, 400, 3), dtype = np.uint8)
    dst_output = np.zeros((600, 400, 3), dtype = np.uint8)

    x = (width +1 - w) // 2             #   1 더한 것은 src w가 홀수 일때 예외 처리
    y = (height+1 - h) // 2             #   1 더한 것은 src h가 홀수 일때 예외 처리

    #   if w 또는 h가 홀수라서 이미지가 맞지않는다면
    #   case 1: 위에 여백이 1 많다.
    #   case 2: 오른쪽 여백이 1 많다.
    if rate < dst_rate: # 가로가 긴 그림 -> src의 h가 홀수인지 신경써야한다 -> 홀수면 하나 더해줘야한다.
        # print("case1")
        src_output[y:height - y + h % 2, x:width - x] = src[:, :]
        ref_output[y:height - y + h % 2, x:width - x] = ref[:, :]
        dst_output[y:height - y + h % 2, x:width - x] = dst[:, :]
    else:               # 세로가 긴 그림 -> src의 w가 홀수인지 신경써야한다
        # print("case2")
        src_output[y:height - y, x:width - x + w % 2] = src[:, :]
        ref_output[y:height - y, x:width - x + w % 2] = ref[:, :]
        dst_output[y:height - y, x:width - x + w % 2] = dst[:, :]

    t = (x,y)

    return src_output, dst_output,  ref_output, t

# in : ptr[[x1,y1,x2,y2],[x1,y1,x2,y2],...,]
# out: ptr_c[[cx,cy],[cx,xy],...]
def get_pts_center(pts):
    pts_c = []
    for pts_i in pts:
        pts_c.append([(pts_i[0]+pts_i[2])//2, (pts_i[1]+pts_i[3])//2, 0])

    return pts_c

# type: (np.ndarray) -> Image
# (영준) 원래 wxPython 라이브러리를 사용했으나 Docker 호환성 문제로 Pillow 라이브러리 구문으로 대체
def create_pil_image(cv2_image):
    cv2_image_rgb = cv2.cvtColor(cv2_image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(cv2_image_rgb)

    return pil_image

# (영준) 이미지 로컬에 저장 + AWS S3에 업로드
# (영준) 주소 관련 에러 발생시 BackendFlaskPath 선언문만 수정하면 됨
def save_and_upload(quizImg, quizImgName, quizImgFolder):
    # BackendFlaskPath = os.path.join(".", "backend_flask")
    BackendFlaskPath = os.path.join(".")
    quizImgPath = os.path.join(BackendFlaskPath, quizImgFolder, quizImgName)

    pil_image = create_pil_image(quizImg)

    # (영준) 프론트에서 이미지 가로 길이를 250px로 제한하게 됨, 비례해서 이미지 축소
    width = 250
    resized_rate = width / pil_image.width
    height = int(pil_image.size[1] * width / pil_image.size[0])
    resized_image = pil_image.resize((width, height))
    resized_image.save(quizImgPath, 'PNG')

    s3_file_path = f"{quizImgFolder}/{quizImgName}"
    s3.upload_file(quizImgPath, AWS_S3_BUCKET, s3_file_path)

    quizImgUrl = f"https://{AWS_S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{s3_file_path}"
    return quizImgUrl, resized_image.width, resized_image.height, resized_rate

#   이미지를 로드하는 함수
#   in: None
#   out: 셔플된 이미지 경로 모음 배열
def load_shuffled_images(BackendFlaskPath, ImgFolder):
    folder_path = os.path.join(BackendFlaskPath, ImgFolder)
    ImageExt = ['png', 'jpg', 'jpeg', 'bmp']
    images = []
    for img in os.listdir(folder_path):
        Ext = img.split('.')[-1]
        # 이미지 파일이면 추가
        if Ext in ImageExt:
            images.append(img) # (영준) 리눅스는 폴더 경로에 '/' 대신 '\'를 사용하므로 맞춰서 수정

    random.shuffle(images)
    return images

class GetNextQuiz(Resource):
    #   다음 퀴즈를 불러오는 함수
    #   in: 다음 이미지 주소
    #   out: (원본, 틀린그림, 정답그림)순서의 병합된 이미지, 정답 좌표, 이동한 좌표
    def get(self):
        # BackendFlaskPath = os.path.join(".", "backend_flask")
        BackendFlaskPath = os.path.join(".")
        ImgFolder = "images"
        ImgName = load_shuffled_images(BackendFlaskPath, ImgFolder)[0]

        ImgPath = os.path.join(BackendFlaskPath, ImgFolder, ImgName) # (영준) 리눅스는 폴더 경로에 '/' 대신 '\'를 사용하므로 맞춰서 수정
        src = cv2.imread(ImgPath)         # 이미지를 로드해서

        dst = src.copy()  # 틀린 그림
        ref = src.copy()                        # 정답 그림

        src, dst, ref = normalize_size(src, dst, ref)     #   크기 정규화를 시키고 (가로 400 또는 세로 600을 맞춤)

        edges = get_morphological_edge(src)       #   엣지를 얻는다
        imgContour = src.copy()                 #   contour를 얻고
        imgMask = np.full(src.shape[:2], 255, np.uint8)  # 흰색바탕에 마스크부분만 검은색         4


        # #   퀴즈 후보 & 퀴즈
        ptsCandidate, approxCandidate = get_contours(edges, imgContour)
        pts = quiz(ptsCandidate, approxCandidate, 10, imgMask, ref)
        pts_c = get_pts_center(pts) # (영준) 좌표를 보정 & 간략화

        # 이미지 지우기
    #    SHIFTMAP = 0,
    #    FSR_BEST = 1,
    #    FSR_FAST = 2
        cv2.xphoto.inpaint(ref, imgMask, dst, 0)

        # 이미지 중앙으로 위치시키기
        # src, dst, ref , t = centering_image(src, dst, ref)

        # 이미지를 가로로 병합하기
        # img = np.hstack([src,dst,ref])

        # (영준) 생성된 이미지를 AWS S3에 업로드
        quizImgLeftName, quizImgRightName, quizImgAnsName = "quizImgLeft.png", "quizImgRight.png", "quizImgAns.png"
        quizImgFolder = "quizImg"

        quizImgLeftUrl, width, height, rate = save_and_upload(src, quizImgLeftName, quizImgFolder)
        quizImgRightUrl, width, height, rate = save_and_upload(dst, quizImgRightName, quizImgFolder)
        quizImgAnsUrl, width, height, rate = save_and_upload(ref, quizImgAnsName, quizImgFolder)

        resized_pts = []
        for pt in pts_c:
            x = int(pt[0] * rate)
            y = int(pt[1] * rate)
            resized_pts.append([x, y, pt[2]])

        # (영준) 추가 필요 : 이미지 제외 나머지 데이터도 로컬에 저장해 두기, 추후 불러올 필요도 있음
        response = {
            'quizImgLeftUrl' : quizImgLeftUrl,
            'quizImgRightUrl' : quizImgRightUrl,
            'quizImgAnsUrl' : quizImgAnsUrl,
            'width' : width,
            'height' : height,
            'pts' : resized_pts
            # 't' : t
        } # (영준) 병합된 이미지 경로(원본, 틀린그림, 정답그림), 가로, 세로, 정답 좌표, 이동한 좌표
        return jsonify(response)

api.add_resource(GetNextQuiz, '/game/difference/get-next-quiz', methods=['GET'])

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0') # (영준) 디버그 모드로 실행, 호스트 설정
