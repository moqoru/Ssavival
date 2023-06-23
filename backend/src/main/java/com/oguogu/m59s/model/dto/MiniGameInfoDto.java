package com.oguogu.m59s.model.dto;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MiniGameInfoDto {

    private long miniGameId;
    private String clearTime;
    private int score;
    MiniGameDetailDto miniGameDetailDto;

}
