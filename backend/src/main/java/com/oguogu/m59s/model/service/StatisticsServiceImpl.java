package com.oguogu.m59s.model.service;

import com.oguogu.m59s.entity.Statistics;
import com.oguogu.m59s.model.dto.StatisticsDto;
import com.oguogu.m59s.repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatisticsServiceImpl implements StatisticsService{

    @Autowired
    StatisticsRepository statisticsRepository;

    @Override
    public StatisticsDto detailStatistics(long userId) {
        Optional<Statistics> statisticsWrapper = statisticsRepository.findByUserId(userId);
        StatisticsDto statisticsDto = null;
        if(statisticsWrapper.isPresent()){
            Statistics statistics = statisticsWrapper.get();
            statisticsDto = statistics.toDto();
        } else {
            Statistics statisticsInit = new Statistics(0,0,0,0,0, userId);
            statisticsDto = statisticsInit.toDto();
        }
        return statisticsDto;
    }

    @Override
    public void saveStatistics(StatisticsDto statisticsDto) {
        statisticsRepository.save(statisticsDto.toEntity());
    }

//    @Override
//    public List<StatisticsDto> listStatistics() {
//        return null;
//    }
}
