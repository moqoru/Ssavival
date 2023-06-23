package com.oguogu.m59s.entity;

import com.oguogu.m59s.model.dto.RecordDto;
import com.oguogu.m59s.model.dto.StatisticsDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long recordId;

    @Column(nullable = false)
    private Short isWin;
    @Column
    private String date;
    @Column
    @ColumnDefault("0")
    private long challengerId;
    @Column
    @ColumnDefault("0")
    private String challengerNickname;
    @Column(nullable = false)
    private String userNickname;
    @Column(nullable = false)
    private long userId;

    public RecordDto toDto() {
        RecordDto recordDto = RecordDto.builder()
                .recordId(recordId)
                .isWin(isWin)
                .challengerId(challengerId)
                .challengerNickname(challengerNickname)
                .userNickname(userNickname)
                .userId(userId)
                .build();
        return recordDto;
    }

}
