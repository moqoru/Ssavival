package com.oguogu.m59s.model.service;

import com.oguogu.m59s.entity.User;
import com.oguogu.m59s.model.dto.GameDto;
import com.oguogu.m59s.model.dto.UserDto;
import com.oguogu.m59s.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    //사용자 정보 출력
    @Override
    public UserDto detailUser(long userId) {
        Optional<User> userWrapper = userRepository.findById(userId);
        UserDto userDto = null;
        if(userWrapper.isPresent()){
            User user = userWrapper.get();
            userDto = user.toDto();
        }
        return userDto;
    }

    @Override
//    @Cacheable(value = "List<UserDto>", cacheManager = "cacheManager")
    //랭크 순서대로 리스트 출력
    public List<UserDto> listUser(){
        Sort sort = Sort.by(Sort.Direction.DESC, "mileage");
        List<User> rankList =userRepository.findAll(sort);
        List<UserDto> rankDtoList = new ArrayList<>();
        if (rankList==null || rankList.isEmpty()){
            System.out.println("비었읍니다");
        }
        else{
            for (User user : rankList) {
                UserDto dto = user.toDto();
                rankDtoList.add(dto);
            }
        }
        return rankDtoList;
    }
    @Override
    public UserDto findUserByEmail(String email) {
        Optional<User> userWrapper = userRepository.findByEmail(email);
        UserDto userDto = null;
        if(userWrapper.isPresent()){
            User user = userWrapper.get();
            userDto = user.toDto();
        }
        return userDto;
    }

    //유저 사진 미드저니로 수정 대비 만들어둠 (지금은 쓸 일 없음)
    @Override
    public void modifyUser(UserDto userDto) {
        System.out.println("USERDTO "+ userDto);
        userRepository.save(userDto.toEntity());
    }

    @Override
    public void registUser(UserDto userDto) {
        System.out.println("USERDTO "+ userDto);
        userRepository.save(userDto.toEntity());
    }

    @Override
    public void updateUser(GameDto gameDto) {
        UserDto userDto = userRepository.findById(gameDto.getUserId()).get().toDto();
        int mileage = userDto.getMileage();
        if(mileage<gameDto.getTotalScore()) {
            userDto.setMileage(gameDto.getTotalScore());
            userRepository.save(userDto.toEntity());
        }
    }
}
