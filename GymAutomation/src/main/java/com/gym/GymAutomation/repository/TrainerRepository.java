package com.gym.GymAutomation.repository;

import com.gym.GymAutomation.entity.Trainer;
import com.gym.GymAutomation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    Optional<Trainer> findByUser(User user);
    Optional<Trainer> findByUserId(Long userId);
}
