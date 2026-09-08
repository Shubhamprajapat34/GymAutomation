package com.gym.GymAutomation.repository;

import com.gym.GymAutomation.entity.Member;
import com.gym.GymAutomation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUser(User user);
    Optional<Member> findByUserId(Long userId);
    List<Member> findAllByTrainerId(Long trainerId);
}
