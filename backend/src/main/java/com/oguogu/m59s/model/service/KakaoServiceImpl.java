package com.oguogu.m59s.model.service;

import com.oguogu.m59s.model.S3FileUploadService;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.json.JSONObject;

import javax.imageio.stream.FileImageOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;

@Service
public class KakaoServiceImpl implements KakaoService{

    @Autowired
    S3FileUploadService s3FileUploadService;

    @Override
    public String makeImage(String thema) throws IOException {
        String REST_API_KEY = "214e28cd99f291355150bfc35e315978";

        // 프롬프트에 사용할 제시어
//        String text = "A lake, alpine, vivid";
        String text = thema;
        System.out.println("TEXT " + text);

        // 이미지 생성하기 REST API 호출
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\n    \"prompt\": {\n        \"text\": \""+text+"\",\n        \"batch_size\": 1\n    }\n}");
        Request request = new Request.Builder()
                .url("https://api.kakaobrain.com/v1/inference/karlo/t2i")
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "KakaoAK "+REST_API_KEY)
                .build();
        Response response = client.newCall(request).execute();

        System.out.println("RESPONSE "+response.body());

        // 응답 JSON 형식으로 변환
        String responseBody = response.body().string();
        System.out.println("responseBody" +responseBody);
        JSONObject json = new JSONObject(responseBody);

        // 응답의 첫 번째 이미지 생성 결과 출력하기
        byte[] imageBytes = Base64.getDecoder().decode(json.getJSONArray("images").getJSONObject(0).getString("image"));

        FileImageOutputStream imageOutputStream = new FileImageOutputStream(new File("src/main/resources/gameImage.png"));
        imageOutputStream.write(imageBytes, 0, imageBytes.length);
        imageOutputStream.close();

        String url = s3FileUploadService.upload();

        return url;
    }
}
