package com.gym.GymAutomation.controller;

import com.gym.GymAutomation.entity.Membership;
import com.gym.GymAutomation.service.MembershipService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memberships")
@CrossOrigin(origins = "*")
public class MembershipController {

    private final MembershipService membershipService;

    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }


    // =====================================
    // ADMIN ONLY - CREATE MEMBERSHIP
    // =====================================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Membership> createMembership(
            @RequestBody Membership membership) {

        return ResponseEntity.ok(
                membershipService.createMembership(membership)
        );
    }


    // =====================================
    // ADMIN + TRAINER + MEMBER
    // VIEW ALL MEMBERSHIPS
    // =====================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TRAINER', 'MEMBER')")
    public ResponseEntity<List<Membership>> getAllMemberships() {

        return ResponseEntity.ok(
                membershipService.getAllMemberships()
        );
    }


    // =====================================
    // ADMIN + TRAINER + MEMBER
    // VIEW MEMBERSHIP BY ID
    // =====================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TRAINER', 'MEMBER')")
    public ResponseEntity<Membership> getMembershipById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                membershipService.getMembershipById(id)
        );
    }


    // =====================================
    // ADMIN ONLY - UPDATE MEMBERSHIP
    // =====================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Membership> updateMembership(
            @PathVariable Long id,
            @RequestBody Membership membership) {

        return ResponseEntity.ok(
                membershipService.updateMembership(id, membership)
        );
    }


    // =====================================
    // ADMIN ONLY - DELETE MEMBERSHIP
    // =====================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteMembership(
            @PathVariable Long id) {

        membershipService.deleteMembership(id);

        return ResponseEntity.ok(
                "Membership deleted successfully"
        );
    }
}