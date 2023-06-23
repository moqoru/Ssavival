package com.oguogu.m59s.entity;

import com.oguogu.m59s.model.dto.MileageListDto;
import com.oguogu.m59s.model.dto.MiniGameDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MileageList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mileageListId;

    @Column(nullable = false)
    private int season;
    @Column(nullable = false)
    private int mileage;
    @Column(nullable = false)
    private long userId;

    public MileageListDto toDto() {
        MileageListDto mileageListDto = MileageListDto.builder()
                .mileageListId(mileageListId)
                .season(season)
                .mileage(mileage)
                .userId(userId)
                .build();
        return mileageListDto;
    }
}
