package com.oguogu.m59s.repository;

import com.oguogu.m59s.entity.MiniGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MiniGameRepository extends JpaRepository<MiniGame, Long> {
    List<MiniGame> findAllByGameId(long gameId);
}
