package com.oguogu.m59s.model.dto;

import com.oguogu.m59s.entity.MiniGame;
import com.oguogu.m59s.entity.MiniGameDetail;
import com.oguogu.m59s.entity.Record;
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
public class MiniGameDetailDto {


    private long miniGameDetailId;

    private String gameName;

    private String gameImg;

    private String gameTime;

    public MiniGameDetail toEntitiy() {
        MiniGameDetail miniGameDetail = MiniGameDetail.builder()
                .miniGameDetailId(miniGameDetailId)
                .gameName(gameName)
                .gameImg(gameImg)
                .gameTime(gameTime)
                .build();
        return miniGameDetail;
    }
}
