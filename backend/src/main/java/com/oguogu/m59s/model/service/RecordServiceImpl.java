package com.oguogu.m59s.model.service;

import com.oguogu.m59s.entity.Record;
import com.oguogu.m59s.model.dto.RecordDto;
import com.oguogu.m59s.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecordServiceImpl implements RecordService{

    @Autowired
    RecordRepository recordRepository;


    @Override
    public List<RecordDto> listRecord(long userId) {
        List<Record> recordList = recordRepository.findAllByUserId(userId);
        List<RecordDto> recordDtoList = new ArrayList<>();
        if(recordList==null || recordList.isEmpty()){
            System.out.println("Record 비웠숩니둥");
        }
        else {
            for(Record record : recordList) {
                RecordDto dto = record.toDto();
                recordDtoList.add(dto);
            }
        }
        return recordDtoList;
    }

    @Override
    public void saveRecord(RecordDto recordDto) {
        recordRepository.save(recordDto.toEntity());
    }
}
