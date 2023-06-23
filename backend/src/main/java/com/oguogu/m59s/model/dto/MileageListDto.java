package com.oguogu.m59s.model.dto;

import com.oguogu.m59s.entity.MileageList;
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
public class MileageListDto {

    private long mileageListId;
    private int season;
    private int mileage;
    private long userId;

    public MileageList toEntitiy() {
        MileageList mileageList = MileageList.builder()
                .mileageListId(mileageListId)
                .season(season)
                .mileage(mileage)
                .userId(userId)
                .build();
        return mileageList;
    }
}
