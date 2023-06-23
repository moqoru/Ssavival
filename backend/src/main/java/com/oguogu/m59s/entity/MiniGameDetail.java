package com.oguogu.m59s.entity;

import com.oguogu.m59s.model.dto.MiniGameDetailDto;
import com.oguogu.m59s.model.dto.RecordDto;
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
public class MiniGameDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long miniGameDetailId;

    @Column(nullable = false , length = 255)
    private String gameName;
    @Column(nullable = false , length = 255)
    private String gameImg;
    @Column(nullable = false , length = 20)
    private String gameTime;

    public MiniGameDetailDto toDto() {
        MiniGameDetailDto miniGameDetailDto = MiniGameDetailDto.builder()
                .miniGameDetailId(miniGameDetailId)
                .gameName(gameName)
                .gameImg(gameImg)
                .gameTime(gameTime)
                .build();
        return miniGameDetailDto;
    }
}
