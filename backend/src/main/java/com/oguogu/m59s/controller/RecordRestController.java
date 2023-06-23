package com.oguogu.m59s.controller;

import com.oguogu.m59s.model.dto.RecordDto;
import com.oguogu.m59s.model.service.RecordService;
import com.oguogu.m59s.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/main/record")
@CrossOrigin(origins = "*")
public class RecordRestController {

    @Autowired
    RecordService recordService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> recordList(@PathVariable long userId) {
        List<RecordDto> recordDtoList = recordService.listRecord(userId);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        resultMap.put("recordList",recordDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> recordList(@RequestBody RecordDto recordDto) {

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result",SUCCESS);
        recordService.saveRecord(recordDto);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }
}
