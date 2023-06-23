package com.oguogu.m59s.controller;

import com.oguogu.m59s.model.service.TokenService;
import com.oguogu.m59s.model.vo.TokenVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/token")
@CrossOrigin(origins = "*")
public class TokenController {

    @Autowired
    TokenService tokenService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("/getTest")
    public TokenVo getToken(@RequestParam String email){
        TokenVo tokenVo = tokenService.getTokenVo(email,"access","refresh");
        return tokenVo;
    }

    @GetMapping("/access/valid")
    public ResponseEntity<Map<String, Object>> accessValidTest(@RequestParam String accessToken){
        Map<String, Object> resultMap = new HashMap<>();
        boolean tokenState = tokenService.validateAccessToken(accessToken);
        resultMap.put("result",SUCCESS);
        resultMap.put("tokenState",tokenState);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @GetMapping("/refresh/valid")
    public ResponseEntity<Map<String, Object>> refreshValidTest(@RequestParam String refreshToken){
        Map<String, Object> resultMap = new HashMap<>();
        boolean tokenState = tokenService.validateRefreshToken(refreshToken);
        String accessToken = null;
        if(tokenState) accessToken = tokenService.refreshAccessToken(refreshToken);

        resultMap.put("result",SUCCESS);
        resultMap.put("tokenState",tokenState);
        resultMap.put("newAccessToken",accessToken);

        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }


}
