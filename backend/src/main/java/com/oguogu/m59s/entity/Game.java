package com.oguogu.m59s.entity;

import com.oguogu.m59s.model.dto.GameDto;
import com.oguogu.m59s.model.dto.MileageListDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game implements Comparable<Game>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long gameId;

    @Column(nullable = false)
    private int successCnt;
    @Column(nullable = false)
    private int failCnt;
    @Column(nullable = false)
    private int totalScore;
    @Column(nullable = false)
    private int totalCnt;
    @Column
    private Date gameDate;
    @Column(nullable = false)
    private long userId;

    public GameDto toDto() {
        GameDto gameDto = GameDto.builder()
                .gameId(gameId)
                .successCnt(successCnt)
                .failCnt(failCnt)
                .totalScore(totalScore)
                .totalCnt(totalCnt)
                .gameDate(gameDate)
                .userId(userId)
                .build();
        return gameDto;
    }

    @Override
    public int compareTo(Game o) {
        return o.totalScore-this.totalScore;
    }
}