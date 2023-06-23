# 베이스 이미지를 선택합니다.
FROM python:3.9.10

# 작업 디렉토리를 설정합니다.
WORKDIR /flask

COPY . /flask

RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libgtk-3-dev \
    python3-pip \
    libwxgtk3.0-gtk3-dev
#    && rm -rf /var/lib/apt/lists/*

# Install wheel
RUN pip3 install wheel

RUN pip3 install flask

#RUN apt-get update \
#    && apt-get install -y --no-install-recommends \
#        python3-pip \
#       libgtk-3-dev \
#    && rm -rf /var/lib/apt/lists/*


# Install the attrdict3 package using pip
RUN pip3 install attrdict3

# 패키지 의존성을 설치합니다.
RUN pip3 install --no-cache-dir -r requirements.txt

# 가상 환경을 만들고 활성화합니다.
RUN python3 -m venv venv
#ENV PATH="/flask/venv/bin:$PATH"

# 애플리케이션을 실행합니다.
CMD [ "python3", "app.py" ]