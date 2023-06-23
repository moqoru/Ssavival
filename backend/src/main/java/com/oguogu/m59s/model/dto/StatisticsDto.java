package com.oguogu.m59s.model.dto;

import com.oguogu.m59s.entity.Statistics;
import com.oguogu.m59s.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatisticsDto {
    private long statisticsId;
    private int totalCnt;
    private int winCnt;
    private int loseCnt;
    private int drawCnt;
    private long userId;

    public Statistics toEntity() {
        Statistics statistics = Statistics.builder()
                .statisticsId(statisticsId)
                .totalCnt(totalCnt)
                .winCnt(winCnt)
                .loseCnt(loseCnt)
                .drawCnt(drawCnt)
                .userId(userId)
                .build();
        return statistics;
    }
}
