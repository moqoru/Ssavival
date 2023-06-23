package com.oguogu.m59s.entity;

import com.oguogu.m59s.model.dto.StatisticsDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Statistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long statisticsId;

    @Column
    @ColumnDefault("0")
    private int totalCnt;
    @Column
    @ColumnDefault("0")
    private int winCnt;
    @Column
    @ColumnDefault("0")
    private int loseCnt;
    @Column
    @ColumnDefault("0")
    private int drawCnt;
    @Column(nullable = false)
    private long userId;

    public StatisticsDto toDto() {
        StatisticsDto statisticsDto = StatisticsDto.builder()
                .statisticsId(statisticsId)
                .totalCnt(totalCnt)
                .winCnt(winCnt)
                .loseCnt(loseCnt)
                .drawCnt(drawCnt)
                .userId(userId)
                .build();
        return statisticsDto;
    }

}
