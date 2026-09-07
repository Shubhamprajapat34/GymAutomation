package com.gym.GymAutomation.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String address;
    private String emergencyContact;
    private String membershipStatus;

    @Column(nullable = false)
    private String subscriptionStatus = "INACTIVE";

    @ManyToOne
    @JoinColumn(name = "membership_id")
    private Membership membership;
 
    public Member() {
    }

    public Member(User user) {
        this.user = user;
        this.membershipStatus = "ACTIVE";
        this.subscriptionStatus = "INACTIVE";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public String getMembershipStatus() {
        return membershipStatus;
    }

    public void setMembershipStatus(String membershipStatus) {
        this.membershipStatus = membershipStatus;
    }
    //======================================

    public String getSubscriptionStatus() {
    return subscriptionStatus;
    }

    public void setSubscriptionStatus(String subscriptionStatus) {
    this.subscriptionStatus = subscriptionStatus;
    }

    public Membership getMembership() {
    return membership;
    }

    public void setMembership(Membership membership) {
    this.membership = membership;
    }
}
