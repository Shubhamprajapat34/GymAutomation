package com.gym.GymAutomation.service;

import com.gym.GymAutomation.entity.Member;
import com.gym.GymAutomation.entity.Membership;
import com.gym.GymAutomation.entity.User;

import com.gym.GymAutomation.repository.MemberRepository;
import com.gym.GymAutomation.repository.MembershipRepository;
import com.gym.GymAutomation.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final MembershipRepository membershipRepository;

    public MemberService(MemberRepository memberRepository, UserRepository userRepository, MembershipRepository membershipRepository) {
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
        this.membershipRepository = membershipRepository;
    }


    // ==========================
    // VIEW ALL MEMBERS
    // ==========================
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    // ==========================
    // VIEW MEMBER BY ID
    // ==========================
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));
    }

    // ==========================
    // UPDATE MEMBER
    // ==========================
    @Transactional
    public Member updateMember(Long id, Member memberDetails) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));

        // Update Member specific fields
        if (memberDetails.getAddress() != null) {
            member.setAddress(memberDetails.getAddress());
        }

        if (memberDetails.getEmergencyContact() != null) {
            member.setEmergencyContact(memberDetails.getEmergencyContact());
        }

        if (memberDetails.getMembershipStatus() != null) {
            member.setMembershipStatus(memberDetails.getMembershipStatus());
        }

        // Update User specific fields if provided
        if (memberDetails.getUser() != null && member.getUser() != null) {
            User existingUser = member.getUser();

            if (memberDetails.getUser().getName() != null) {
                existingUser.setName(memberDetails.getUser().getName());
            }

            if (memberDetails.getUser().getEmail() != null) {
                existingUser.setEmail(memberDetails.getUser().getEmail());
            }

            if (memberDetails.getUser().getPhone() != null) {
                existingUser.setPhone(memberDetails.getUser().getPhone());
            }

            userRepository.save(existingUser);
        }

        return memberRepository.save(member);
    }
    //==============================================================
    // assign membership to member 
    
    public Member assignMembership(Long memberId, Long membershipId) {

    Member member = memberRepository.findById(memberId)
            .orElseThrow(() ->
                    new RuntimeException("Member not found with ID: " + memberId)
            );

    Membership membership = membershipRepository.findById(membershipId)
            .orElseThrow(() ->
                    new RuntimeException("Membership not found with ID: " + membershipId)
            );

    // Membership assign
    member.setMembership(membership);

    // Subscription activate
    member.setSubscriptionStatus("ACTIVE");

    return memberRepository.save(member);
   }
    

    // ==========================
    // DELETE MEMBER
    // ==========================
    @Transactional
    public void deleteMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + id));

        memberRepository.delete(member);
    }
}