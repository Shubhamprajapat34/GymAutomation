package com.gym.GymAutomation.controller;

import com.gym.GymAutomation.entity.Member;
import com.gym.GymAutomation.service.MemberService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@RestController
@RequestMapping("/api/admin/members")
@CrossOrigin(origins = "*")
public class AdminMemberController {

    private final MemberService memberService;

    public AdminMemberController(MemberService memberService) {
        this.memberService = memberService;
    }


    
    // VIEW ALL MEMBERS
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Member>> getAllMembers() {

        return ResponseEntity.ok(
                memberService.getAllMembers()
        );
    }


    
    // VIEW MEMBER BY ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Member> getMemberById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                memberService.getMemberById(id)
        );
    }



    // UPDATE MEMBER
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Member> updateMember(
            @PathVariable Long id,
            @RequestBody Member member) {

        return ResponseEntity.ok(
                memberService.updateMember(id, member)
        );
    }


    
    // DELETE MEMBER
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteMember(
            @PathVariable Long id) {

        memberService.deleteMember(id);

        return ResponseEntity.ok(
                "Member deleted successfully"
        );
    }

    // Controller for Assign Membership
    @PutMapping("/{memberId}/membership/{membershipId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Member> assignMembership(
                                @PathVariable Long memberId,
                                @PathVariable Long membershipId) {

         Member member = memberService.assignMembership(memberId, membershipId);

         return ResponseEntity.ok(member);
     }

    @PutMapping("/{memberId}/trainer/{trainerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Member> assignTrainer(
            @PathVariable Long memberId,
            @PathVariable Long trainerId) {
        return ResponseEntity.ok(
                memberService.assignTrainer(memberId, trainerId)
        );
    }

}