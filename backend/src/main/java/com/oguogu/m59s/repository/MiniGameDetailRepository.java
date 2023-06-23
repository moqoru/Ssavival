package com.oguogu.m59s.repository;

import com.oguogu.m59s.entity.MiniGameDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MiniGameDetailRepository extends JpaRepository<MiniGameDetail, Long> {
}
