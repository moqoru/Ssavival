package com.oguogu.m59s.model.service;

import com.oguogu.m59s.entity.User;
import com.oguogu.m59s.model.dto.GameDto;
import com.oguogu.m59s.model.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto detailUser(long userId);
    List<UserDto> listUser();
//    UserDto findUserByNickname(String nickname);
    UserDto findUserByEmail(String email);
    public void modifyUser(UserDto userDto);
    void registUser(UserDto userDto);
    void updateUser(GameDto gameDto);
}
