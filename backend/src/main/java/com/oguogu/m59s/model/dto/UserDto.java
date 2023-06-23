package com.oguogu.m59s.model.dto;

import com.oguogu.m59s.entity.User;
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
public class UserDto {
    private long userId;
    private String nickname;
    private int campus;
    private int mileage;
    private String email;
    //DB에 저장하지 않을꺼고 출력할 때 즉석해서 계산해서 보여줄 것(손쉽게 배열에 담아서 출력하기 위함)
    private String tier;

    public User toEntity() {
        User user = User.builder()
                .userId(userId)
                .nickname(nickname)
                .campus(campus)
                .mileage(mileage)
                .email(email)
                .build();
        return user;
    }
}
