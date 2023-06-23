package com.oguogu.m59s.model.dto;

import com.oguogu.m59s.entity.MiniGame;
import com.oguogu.m59s.entity.MiniGameDetail;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MiniGameDto {

    private long miniGameId;
    private String clearTime;
    private int score;
    private long gameId;
    private MiniGameDetail miniGameDetail;


    public MiniGame toEntity() {
        MiniGame miniGame = MiniGame.builder()
                .miniGameId(miniGameId)
                .clearTime(clearTime)
                .score(score)
                .gameId(gameId)
                .miniGameDetail(miniGameDetail)
                .build();
        return miniGame;
    }
}
