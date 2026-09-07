package com.gym.GymAutomation.repository;

import com.gym.GymAutomation.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipRepository
        extends JpaRepository<Membership, Long> {

}