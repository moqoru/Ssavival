package com.oguogu.m59s.model.dto;

import com.oguogu.m59s.entity.Record;
import com.oguogu.m59s.entity.Statistics;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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
public class RecordDto {

    private long recordId;
    private Short isWin;
    private String date;
    private long challengerId;
    private String challengerNickname;
    private String userNickname;
    private long userId;

    public Record toEntity() {
        Record record = Record.builder()
                .recordId(recordId)
                .isWin(isWin)
                .challengerId(challengerId)
                .challengerNickname(challengerNickname)
                .userNickname(userNickname)
                .userId(userId)
                .build();
        return record;
    }
}
