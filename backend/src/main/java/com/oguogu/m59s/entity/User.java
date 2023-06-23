package com.oguogu.m59s.entity;

import com.oguogu.m59s.model.dto.UserDto;
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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(length = 10 , nullable = false)
    private String nickname;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int campus;

    @Column
    private int mileage;

    @Column(nullable = false)
    private String email;

    public UserDto toDto() {
        UserDto userDto = UserDto.builder()
                .userId(userId)
                .nickname(nickname)
                .campus(campus)
                .mileage(mileage)
                .email(email)
                .build();
        return userDto;
    }

}
