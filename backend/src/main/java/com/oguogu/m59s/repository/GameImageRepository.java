package com.oguogu.m59s.repository;

import com.oguogu.m59s.entity.Game;
import com.oguogu.m59s.entity.GameImage;
import com.oguogu.m59s.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameImageRepository extends JpaRepository<GameImage, Long> {
    List<GameImage> findAllByMiniGameId(long miniGameId);
}
