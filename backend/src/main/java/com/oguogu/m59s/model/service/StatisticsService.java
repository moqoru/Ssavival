package com.oguogu.m59s.model.service;
import com.oguogu.m59s.model.dto.StatisticsDto;

import java.util.List;

public interface StatisticsService {
    StatisticsDto detailStatistics(long userId);
//    List<StatisticsDto> listStatistics();
    void saveStatistics(StatisticsDto statisticsDto);
}
