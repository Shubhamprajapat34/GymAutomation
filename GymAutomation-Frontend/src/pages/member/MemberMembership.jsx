import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MemberMembership.css";

const MemberMembership = () => {

    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchMembership = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get(
                    "/api/member/membership"
                );

                setMember(response.data);

            } catch (err) {

                console.error(
                    "Membership error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load membership details."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchMembership();

    }, []);


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (
            <div className="membership-loading">

                <div className="membership-spinner"></div>

                <p>
                    Loading membership details...
                </p>

            </div>
        );
    }


    /* =========================
       ERROR
    ========================= */

    if (error) {

        return (
            <div className="membership-page">

                <div className="membership-error">

                    <span className="membership-error-icon">
                        ⚠️
                    </span>

                    <div>
                        <h3>
                            Unable to load membership
                        </h3>

                        <p>
                            {error}
                        </p>
                    </div>

                </div>

            </div>
        );
    }


    const membership = member?.membership;

    const isActive =
        member?.subscriptionStatus === "ACTIVE";


    /* =========================
       NO MEMBERSHIP
    ========================= */

    if (!membership) {

        return (
            <div className="membership-page">

                <div className="membership-heading">

                    <div>

                        <span>
                            MEMBERSHIP
                        </span>

                        <h1>
                            My Membership
                        </h1>

                        <p>
                            Manage and view your current
                            gym membership.
                        </p>

                    </div>

                </div>


                <div className="membership-empty">

                    <div className="membership-empty-icon">
                        ⭐
                    </div>

                    <h2>
                        No Membership Assigned
                    </h2>

                    <p>
                        You don't currently have a membership
                        assigned to your account.
                    </p>

                    <div className="membership-inactive">
                        INACTIVE
                    </div>

                </div>

            </div>
        );
    }


    return (

        <div className="membership-page">

            {/* =========================
                PAGE HEADING
            ========================= */}

            <div className="membership-heading">

                <div>

                    <span>
                        MEMBERSHIP
                    </span>

                    <h1>
                        My Membership
                    </h1>

                    <p>
                        Your membership details and
                        subscription status.
                    </p>

                </div>

                <div
                    className={
                        isActive
                            ? "membership-top-status active"
                            : "membership-top-status"
                    }
                >

                    <span className="status-dot"></span>

                    {isActive
                        ? "ACTIVE"
                        : "INACTIVE"}

                </div>

            </div>


            {/* =========================
                MEMBERSHIP CARD
            ========================= */}

            <div className="membership-main-card">

                <div className="membership-card-background"></div>


                <div className="membership-card-content">

                    <div className="membership-card-top">

                        <div>

                            <span className="membership-card-label">
                                GYMFLOW MEMBERSHIP
                            </span>

                            <h2>
                                {membership.name ||
                                    "Gym Membership"}
                            </h2>

                        </div>

                        <div className="membership-star">
                            ★
                        </div>

                    </div>


                    <div className="membership-price">

                        <span>
                            ₹
                        </span>

                        <strong>
                            {membership.price ?? "—"}
                        </strong>

                        <small>
                            / plan
                        </small>

                    </div>


                    <div className="membership-card-bottom">

                        <div>

                            <span>
                                MEMBER
                            </span>

                            <strong>
                                {member?.user?.name ||
                                    "Member"}
                            </strong>

                        </div>


                        <div>

                            <span>
                                STATUS
                            </span>

                            <strong>
                                {isActive
                                    ? "Active"
                                    : "Inactive"}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                DETAILS
            ========================= */}

            <div className="membership-details-grid">

                <div className="membership-detail-card">

                    <div className="detail-icon purple">
                        💳
                    </div>

                    <div>

                        <span>
                            Plan Name
                        </span>

                        <strong>
                            {membership.name ||
                                "Not Available"}
                        </strong>

                    </div>

                </div>


                <div className="membership-detail-card">

                    <div className="detail-icon orange">
                        ₹
                    </div>

                    <div>

                        <span>
                            Membership Price
                        </span>

                        <strong>
                            ₹{membership.price ?? "—"}
                        </strong>

                    </div>

                </div>


                <div className="membership-detail-card">

                    <div className="detail-icon blue">
                        ⏱
                    </div>

                    <div>

                        <span>
                            Duration
                        </span>

                        <strong>
                            {membership.duration
                                ? `${membership.duration} Days`
                                : "—"}
                        </strong>

                    </div>

                </div>


                <div className="membership-detail-card">

                    <div className="detail-icon green">
                        ✓
                    </div>

                    <div>

                        <span>
                            Subscription
                        </span>

                        <strong>
                            {member?.subscriptionStatus ||
                                "INACTIVE"}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =========================
                BENEFITS
            ========================= */}

            <div className="membership-benefits">

                <div className="benefits-heading">

                    <div className="benefits-icon">
                        ✨
                    </div>

                    <div>

                        <h2>
                            Membership Benefits
                        </h2>

                        <p>
                            Make the most out of your
                            gym membership.
                        </p>

                    </div>

                </div>


                <div className="benefits-list">

                    <div>
                        <span>✓</span>
                        Access to gym facilities
                    </div>

                    <div>
                        <span>✓</span>
                        Personalized workout plans
                    </div>

                    <div>
                        <span>✓</span>
                        Personalized diet plans
                    </div>

                    <div>
                        <span>✓</span>
                        Trainer guidance
                    </div>

                </div>

            </div>

        </div>
    );
};

export default MemberMembership;