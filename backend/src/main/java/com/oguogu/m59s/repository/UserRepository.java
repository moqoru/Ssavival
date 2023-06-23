package com.oguogu.m59s.repository;

import com.oguogu.m59s.entity.Statistics;
import com.oguogu.m59s.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByNickname(String nickname);
    Optional<User> findByEmail(String email);
}
