package com.gym.GymAutomation.service;

import com.gym.GymAutomation.entity.Membership;
import com.gym.GymAutomation.repository.MembershipRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembershipService {

    private final MembershipRepository membershipRepository;

    public MembershipService(MembershipRepository membershipRepository) {
        this.membershipRepository = membershipRepository;
    }


    // CREATE MEMBERSHIP
    public Membership createMembership(Membership membership) {
        return membershipRepository.save(membership);
    }


    // VIEW ALL MEMBERSHIPS
    public List<Membership> getAllMemberships() {
        return membershipRepository.findAll();
    }


    // VIEW MEMBERSHIP BY ID
    public Membership getMembershipById(Long id) {
        return membershipRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Membership not found with id: " + id)
                );
    }


    // UPDATE MEMBERSHIP
    public Membership updateMembership(Long id, Membership membershipDetails) {

        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Membership not found with id: " + id)
                );

        if (membershipDetails.getName() != null) {
            membership.setName(membershipDetails.getName());
        }

        if (membershipDetails.getPrice() != null) {
            membership.setPrice(membershipDetails.getPrice());
        }

        if (membershipDetails.getDurationMonths() != null) {
            membership.setDurationMonths(
                    membershipDetails.getDurationMonths()
            );
        }

        if (membershipDetails.getDescription() != null) {
            membership.setDescription(
                    membershipDetails.getDescription()
            );
        }

        return membershipRepository.save(membership);
    }


    // DELETE MEMBERSHIP
    public void deleteMembership(Long id) {

        Membership membership = membershipRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Membership not found with id: " + id)
                );

        membershipRepository.delete(membership);
    }
}