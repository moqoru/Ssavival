package com.oguogu.m59s.model.dto;

import com.oguogu.m59s.entity.Game;
import com.oguogu.m59s.entity.MileageList;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameDto implements Comparable<GameDto>{

    private long gameId;
    private int successCnt;
    private int failCnt;
    private int totalScore;
    private int totalCnt;
    private Date gameDate;
    private long userId;

    public Game toEntitiy() {
        Game game = Game.builder()
                .gameId(gameId)
                .successCnt(successCnt)
                .failCnt(failCnt)
                .totalScore(totalScore)
                .totalCnt(totalCnt)
                .gameDate(gameDate)
                .userId(userId)
                .build();
        return game;
    }


    @Override
    public int compareTo(@NotNull GameDto o) {
        return o.totalScore-this.totalScore;
    }
}
