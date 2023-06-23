package com.oguogu.m59s.model.service;

import com.oguogu.m59s.model.vo.TokenVo;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class TokenService {
    private final String CLIENT_ID = "a8fc6ea8ba88c3b516a9661dc79841eb";
    private final String CLIENT_SECRET = "WG3usQJCmWqPSU6TdfZ7VNOP6d1iiD3W";
    String tokenUrl = "https://kauth.kakao.com/oauth/token";
    public TokenVo getTokenVo(String email, String access_token, String refresh_token){
        TokenVo tokenVo = new TokenVo();
        tokenVo.setEmail(email);
        tokenVo.setAccessToken(access_token);
        tokenVo.setRefreshToken(refresh_token);

        return tokenVo;
    }

    public boolean validateAccessToken(String accessToken) {
        String validationUrl = "https://kapi.kakao.com/v1/user/access_token_info?access_token=" + accessToken;

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet(validationUrl);

        try {
            HttpResponse response = httpClient.execute(request);

            // Process the response
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == 200) {
                // Token is valid
                return true;
            } else {
                // Token is invalid
                return false;
            }
        } catch (Exception e) {
            // Exception occurred during the request
            e.printStackTrace();
            return false;
        }
    }

    public boolean validateRefreshToken(String refreshToken) {
//        String tokenUrl = "https://kauth.kakao.com/oauth/token";

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost request = new HttpPost(tokenUrl);

        // Set request parameters
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("grant_type", "refresh_token"));
        params.add(new BasicNameValuePair("refresh_token", refreshToken));
        params.add(new BasicNameValuePair("client_id", CLIENT_ID)); // Replace with your Kakao app's client ID
        params.add(new BasicNameValuePair("client_secret", CLIENT_SECRET)); // Replace with your Kakao app's client secret

        try {
            request.setEntity(new UrlEncodedFormEntity(params));

            HttpResponse response = httpClient.execute(request);

            // Process the response
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == 200) {
                // Refresh token is valid
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder responseContent = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    responseContent.append(line);
                }
                // Parse the response content and extract the new access token
                // You may need to use a JSON parsing library like Jackson or Gson

                // Perform additional validation if needed

                return true;
            } else {
                // Refresh token is invalid
                return false;
            }
        } catch (IOException e) {
            // Exception occurred during the request
            e.printStackTrace();
            return false;
        }

    }


    public String refreshAccessToken(String refreshToken) {
//        String tokenUrl = "https://kauth.kakao.com/oauth/token";

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost request = new HttpPost(tokenUrl);

        // Set request parameters
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("grant_type", "refresh_token"));
        params.add(new BasicNameValuePair("refresh_token", refreshToken));
        params.add(new BasicNameValuePair("client_id", CLIENT_ID)); // Replace with your Kakao app's client ID
        params.add(new BasicNameValuePair("client_secret", CLIENT_SECRET)); // Replace with your Kakao app's client secret

        try {
            request.setEntity(new UrlEncodedFormEntity(params));

            HttpResponse response = httpClient.execute(request);

            // Process the response
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == 200) {
                // Refresh token is valid
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
                StringBuilder responseContent = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    responseContent.append(line);
                }
                // Parse the response content and extract the new access token
                // You may need to use a JSON parsing library like Jackson or Gson
                String newAccessToken = parseAccessTokenFromResponse(responseContent.toString());

                return newAccessToken;
            } else {
                // Refresh token is invalid
                return null;
            }
        } catch (IOException e) {
            // Exception occurred during the request
            e.printStackTrace();
            return null;
        }
    }

    private String parseAccessTokenFromResponse(String responseContent) {
        try {
            JSONObject jsonResponse = new JSONObject(responseContent);
            String accessToken = jsonResponse.getString("access_token");
            return accessToken;
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

}
