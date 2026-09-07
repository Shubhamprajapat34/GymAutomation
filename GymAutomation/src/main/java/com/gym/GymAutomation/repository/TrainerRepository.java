package com.gym.GymAutomation.repository;

import com.gym.GymAutomation.entity.Trainer;
import com.gym.GymAutomation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    Optional<Trainer> findByUser(User user);
    Optional<Trainer> findByUserId(Long userId);
}
