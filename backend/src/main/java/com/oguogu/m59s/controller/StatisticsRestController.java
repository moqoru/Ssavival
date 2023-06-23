package com.oguogu.m59s.controller;

import com.oguogu.m59s.model.dto.StatisticsDto;
import com.oguogu.m59s.model.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/main/statistics")
@CrossOrigin(origins = "*")
public class StatisticsRestController {

    @Autowired
    StatisticsService statisticsService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> statisticsDetail(@PathVariable long userId) {
        Map<String, Object> resultMap = new HashMap<>();
        System.out.println("useriddddddddddd " + userId);
        StatisticsDto statisticsDto = statisticsService.detailStatistics(userId);
        resultMap.put("result",SUCCESS);
        resultMap.put("statistics",statisticsDto);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @PatchMapping("/done")
    public ResponseEntity<Map<String, Object>> statisticsUpdate(@RequestBody Map<String,Integer> resultInfo) {
        long userId = (long) resultInfo.get("userId");
        int result = resultInfo.get("status");//0승 ,1패 ,2무
        StatisticsDto statisticsDto = statisticsService.detailStatistics(userId);
        statisticsDto.setTotalCnt(statisticsDto.getTotalCnt()+1);
        if(result==0) statisticsDto.setWinCnt(statisticsDto.getWinCnt()+1);
        else if(result==1) statisticsDto.setLoseCnt(statisticsDto.getLoseCnt()+1);
        else statisticsDto.setDrawCnt(statisticsDto.getDrawCnt()+1);
        statisticsService.saveStatistics(statisticsDto);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }
}
