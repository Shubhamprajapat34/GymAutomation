package com.gym.GymAutomation.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.gym.GymAutomation.entity.Gym;

public interface GymRepository extends JpaRepository<Gym, Long> {

}