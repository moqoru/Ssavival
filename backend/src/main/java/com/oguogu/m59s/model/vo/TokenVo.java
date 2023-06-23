package com.oguogu.m59s.model.vo;

import lombok.Data;

@Data
public class TokenVo {
    private String email;
    private String accessToken;
    private String refreshToken;


}
