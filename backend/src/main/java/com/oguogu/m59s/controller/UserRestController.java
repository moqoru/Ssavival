package com.oguogu.m59s.controller;

import com.oguogu.m59s.model.dto.UserDto;
import com.oguogu.m59s.model.service.KakaoService;
import com.oguogu.m59s.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserRestController {

    @Autowired
    UserService userService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    //유저 정보 출력
    @GetMapping("/main/{userId}")
    public ResponseEntity<Map<String, Object>> userDetail (@PathVariable long userId){
        Map<String, Object> resultMap = new HashMap<>();
        UserDto userDto = userService.detailUser(userId);
        List<UserDto> userDtoList = userService.listUser();
        int size = 5;
        if(userDtoList.size()<5) size = userDtoList.size();
        //5등 이내는 challenger
        for(int i=0;i<size;i++){
            if(userDtoList.get(i).getUserId()==userId) userDto.setTier("challenger");
        }
        if(userDto.getTier()==null){
            int mileage = userDto.getMileage();
            if(mileage<4000) userDto.setTier("bronze");
            else if(mileage<5000) userDto.setTier("silver");
            else if(mileage<6000) userDto.setTier("gold");
            else if(mileage<7000) userDto.setTier("platinum");
            else if(mileage<8000) userDto.setTier("diamond");
            else userDto.setTier("master");
        }
        resultMap.put("result",SUCCESS);
        resultMap.put("user",userDto);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @GetMapping("/main/find/{email}")
    public ResponseEntity<Map<String, Object>> userDetailByEmail (@PathVariable String email){
        Map<String, Object> resultMap = new HashMap<>();
        UserDto userDto = userService.findUserByEmail(email);
        resultMap.put("result",SUCCESS);
        resultMap.put("user",userDto);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @GetMapping("/main/ranking")
    public ResponseEntity<Map<String, Object>> userList(){
        List<UserDto> userDtoList = userService.listUser();
        Map<String, Object> resultMap = new HashMap<>();
        int size = 5;
        if(userDtoList.size()<5) size = userDtoList.size();
        //5등 이내는 challenger
        for(int i=0;i<size;i++){
            userDtoList.get(i).setTier("challenger");
        }
        for(int i=size; i<userDtoList.size();i++){
            UserDto userDto = userDtoList.get(i);
            int mileage = userDto.getMileage();
            if(mileage<4000) userDto.setTier("bronze");
            else if(mileage<5000) userDto.setTier("silver");
            else if(mileage<6000) userDto.setTier("gold");
            else if(mileage<7000) userDto.setTier("platinum");
            else if(mileage<8000) userDto.setTier("diamond");
            else userDto.setTier("master");
        }
        resultMap.put("result",SUCCESS);
        resultMap.put("userList",userDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @GetMapping("/main/average")
    public ResponseEntity<Map<String, Object>> localAverage(){
        List<UserDto> userDtoList = userService.listUser();
        int seoulTotalScore = 0;
        int daejeonTotalScore = 0;
        int gumiTotalScore = 0;
        int gwangjuTotalScore = 0;
        int busanTotalScore = 0;
        int seoulTotalCount = 0;
        int daejeonTotalCount = 0;
        int gumiTotalCount = 0;
        int gwangjuTotalCount = 0;
        int busanTotalCount = 0;

        for(UserDto userDto : userDtoList){
            int campus = userDto.getCampus();
            int score = userDto.getMileage();
            switch (campus) {
                case 0://서울
                    seoulTotalScore += score;
                    seoulTotalCount += 1;
                    break;
                case 1://대전
                    daejeonTotalScore += score;
                    daejeonTotalCount += 1;
                    break;
                case 2://광주
                    gwangjuTotalScore += score;
                    gwangjuTotalCount += 1;
                    break;
                case 3://구미
                    gumiTotalScore += score;
                    gumiTotalCount += 1;
                    break;
                default://부울경
                    busanTotalScore += score;
                    busanTotalCount += 1;
                    break;
            }//switch
        }//foreach
        int Seoul = 0; int Daejeon = 0; int Gumi = 0; int Gwangju = 0; int Busan = 0;
        if(seoulTotalCount != 0) Seoul = seoulTotalScore / seoulTotalCount;
        if(daejeonTotalCount != 0) Daejeon = daejeonTotalScore / daejeonTotalCount;
        if(gumiTotalCount != 0) Gumi = gumiTotalScore / gumiTotalCount;
        if(gwangjuTotalCount != 0) Gwangju = gwangjuTotalScore / gwangjuTotalCount;
        if(busanTotalCount != 0) Busan = busanTotalScore / busanTotalCount;

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("Seoul",Seoul);
        resultMap.put("Daejeon",Daejeon);
        resultMap.put("Gumi",Gumi);
        resultMap.put("Gwangju",Gwangju);
        resultMap.put("Busan",Busan);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

}
