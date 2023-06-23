package com.oguogu.m59s.entity;

import com.oguogu.m59s.model.dto.MiniGameDetailDto;
import com.oguogu.m59s.model.dto.MiniGameDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MiniGame implements Comparable<MiniGame>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long miniGameId;

    @Column(length = 20)
    private String clearTime;
    @Column(nullable = false)
    private int score;
    @Column(nullable = false)
    private long gameId;
    @OneToOne
    @JoinColumn(name = "miniGameDetailId")
    private MiniGameDetail miniGameDetail;

    public MiniGameDto toDto() {
        MiniGameDto miniGameDto = MiniGameDto.builder()
                .miniGameId(miniGameId)
                .clearTime(clearTime)
                .score(score)
                .gameId(gameId)
                .miniGameDetail(miniGameDetail)
                .build();
        return miniGameDto;
    }

    @Override
    public String toString() {
        return "MiniGame{" +
                "miniGameId=" + miniGameId +
                ", clearTime='" + clearTime + '\'' +
                ", score=" + score +
                ", gameId=" + gameId +
                ", miniGameDetailId=" + miniGameDetail +
                '}';
    }

        public int compareTo(@NotNull MiniGame o) {
        return (int) (o.miniGameId-this.miniGameId);
    }

}
