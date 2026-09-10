package com.gym.GymAutomation.repository;

import com.gym.GymAutomation.entity.DietPlan;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    List<DietPlan> findAllByTrainerId(Long trainerId);
    Optional<DietPlan> findByIdAndTrainerId(Long id, Long trainerId);

    List<DietPlan> findAllByMemberId(Long memberId);
}