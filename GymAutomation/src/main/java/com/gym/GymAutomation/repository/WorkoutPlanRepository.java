package com.gym.GymAutomation.repository;

import com.gym.GymAutomation.entity.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {
    List<WorkoutPlan> findAllByTrainerId(Long trainerId);
    Optional<WorkoutPlan> findByIdAndTrainerId(Long id, Long trainerId);
}