package com.oguogu.m59s.entity;

import com.oguogu.m59s.model.dto.GameImageDto;
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
public class GameImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long gameImageId;

    @Column
    private int round;
    @Column
    private String imageUrl;
    @Column
    private Date createdTime;
    @Column(nullable = false)
    private long miniGameId;

    public GameImageDto toDto() {
        GameImageDto gameImageDto = GameImageDto.builder()
                .gameImageId(gameImageId)
                .round(round)
                .imageUrl(imageUrl)
                .createdTime(createdTime)
                .miniGameId(miniGameId)
                .build();
        return gameImageDto;
    }

}