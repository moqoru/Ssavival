package com.oguogu.m59s.model.service;

import com.oguogu.m59s.model.dto.RecordDto;

import java.util.List;

public interface RecordService {
    List<RecordDto> listRecord(long userId);
    void saveRecord(RecordDto recordDto);
}