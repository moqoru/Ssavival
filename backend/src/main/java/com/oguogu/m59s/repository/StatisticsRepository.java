package com.oguogu.m59s.repository;

import com.oguogu.m59s.entity.Statistics;
import com.oguogu.m59s.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    Optional<Statistics> findByUserId(long userId);
}
