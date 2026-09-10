import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MemberDashboard.css";

const MemberDashboard = () => {

    const navigate = useNavigate();

    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMemberDashboard();
    }, []);

    const fetchMemberDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/api/member/dashboard"
            );

            console.log(
                "Member Dashboard:",
                response.data
            );

            setMember(response.data);

        } catch (error) {

            console.error(
                "Dashboard API Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load dashboard"
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {

        return (
            <div className="member-dashboard-loading">

                <div className="dashboard-loader"></div>

                <h3>
                    Loading your dashboard...
                </h3>

                <p>
                    Getting your fitness information
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="member-dashboard-error">

                <div className="error-icon">
                    !
                </div>

                <h3>
                    Something went wrong
                </h3>

                <p>
                    {error}
                </p>

                <button
                    onClick={fetchMemberDashboard}
                    className="dashboard-retry-button"
                >
                    Try Again
                </button>

            </div>
        );

    }


    if (!member) {

        return (
            <div className="member-dashboard-empty">
                No member data available.
            </div>
        );

    }


    const user = member.user;
    const membership = member.membership;
    const trainer = member.trainer;


    const memberName =
        user?.name || "Member";


    const firstName =
        memberName.split(" ")[0];


    const trainerName =
        trainer?.user?.name || "Not Assigned";


    /*
     * Simple profile completion calculation
     */

    const profileFields = [
        user?.name,
        user?.email,
        user?.phone,
        member.address,
        member.emergencyContact
    ];

    const completedFields =
        profileFields.filter(Boolean).length;

    const profilePercentage =
        Math.round(
            (completedFields / profileFields.length) * 100
        );


    return (

        <div className="member-dashboard-page">


            {/* =================================
                WELCOME HERO
            ================================= */}

            <section className="member-welcome-card">

                <div className="welcome-content">

                    <span className="welcome-label">
                        MEMBER DASHBOARD
                    </span>

                    <h1>
                        Welcome back, {firstName} 👋
                    </h1>

                    <p>
                        Stay consistent, stay strong,
                        and keep working toward your goals.
                    </p>

                    <button
                        className="hero-action-button"
                        onClick={() =>
                            navigate(
                                "/member/workout-plans"
                            )
                        }
                    >
                        View My Workout
                        <span>→</span>
                    </button>

                </div>


                <div className="welcome-decoration">

                    <div className="fitness-circle">
                        💪
                    </div>

                    <div className="floating-dot dot-one"></div>
                    <div className="floating-dot dot-two"></div>
                    <div className="floating-dot dot-three"></div>

                </div>

            </section>


            {/* =================================
                STAT CARDS
            ================================= */}

            <section className="member-dashboard-stats">


                {/* MEMBERSHIP */}

                <div className="dashboard-stat-card membership-stat">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            ⭐
                        </div>

                        <span className="stat-arrow">
                            →
                        </span>

                    </div>

                    <span className="dashboard-stat-label">
                        MEMBERSHIP
                    </span>

                    <h2>
                        {membership?.name ||
                            "Not Assigned"}
                    </h2>

                    <p>
                        {member.subscriptionStatus ||
                            "INACTIVE"}
                    </p>

                </div>


                {/* TRAINER */}

                <div className="dashboard-stat-card trainer-stat">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            👨‍🏫
                        </div>

                        <span className="stat-arrow">
                            →
                        </span>

                    </div>

                    <span className="dashboard-stat-label">
                        MY TRAINER
                    </span>

                    <h2>
                        {trainerName}
                    </h2>

                    <p>
                        {trainer?.specialization ||
                            "No specialization"}
                    </p>

                </div>


                {/* SUBSCRIPTION */}

                <div className="dashboard-stat-card subscription-stat">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            🔥
                        </div>

                        <span className="stat-arrow">
                            →
                        </span>

                    </div>

                    <span className="dashboard-stat-label">
                        SUBSCRIPTION
                    </span>

                    <h2>
                        {member.subscriptionStatus ||
                            "INACTIVE"}
                    </h2>

                    <p>
                        Current status
                    </p>

                </div>


                {/* STATUS */}

                <div className="dashboard-stat-card status-stat">

                    <div className="dashboard-stat-top">

                        <div className="dashboard-stat-icon">
                            ✓
                        </div>

                        <span className="stat-arrow">
                            →
                        </span>

                    </div>

                    <span className="dashboard-stat-label">
                        MEMBER STATUS
                    </span>

                    <h2>
                        {member.membershipStatus ||
                            "N/A"}
                    </h2>

                    <p>
                        Account status
                    </p>

                </div>

            </section>


            {/* =================================
                MIDDLE SECTION
            ================================= */}

            <section className="member-dashboard-main-grid">


                {/* MEMBERSHIP */}

                <div className="dashboard-large-card">

                    <div className="dashboard-card-header">

                        <div>

                            <span>
                                CURRENT PLAN
                            </span>

                            <h2>
                                {membership?.name ||
                                    "No Membership"}
                            </h2>

                        </div>

                        <div className="plan-star">
                            ⭐
                        </div>

                    </div>


                    {membership ? (

                        <>

                            <div className="membership-highlight">

                                <div>

                                    <small>
                                        Membership Price
                                    </small>

                                    <strong>
                                        ₹{membership.price ?? 0}
                                    </strong>

                                </div>


                                <div className="active-status">

                                    <span></span>

                                    {member.subscriptionStatus ||
                                        "INACTIVE"}

                                </div>

                            </div>


                            <div className="plan-info-row">

                                <div>
                                    <small>
                                        Membership Status
                                    </small>

                                    <strong>
                                        {member.membershipStatus ||
                                            "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <small>
                                        Subscription
                                    </small>

                                    <strong>
                                        {member.subscriptionStatus ||
                                            "N/A"}
                                    </strong>
                                </div>

                            </div>

                        </>

                    ) : (

                        <div className="dashboard-no-data">
                            No membership assigned yet.
                        </div>

                    )}


                    <button
                        className="dashboard-outline-button"
                        onClick={() =>
                            navigate(
                                "/member/membership"
                            )
                        }
                    >
                        View Membership
                        <span>→</span>
                    </button>

                </div>


                {/* TRAINER */}

                <div className="dashboard-large-card trainer-dashboard-card">

                    <div className="dashboard-card-header">

                        <div>

                            <span>
                                YOUR FITNESS COACH
                            </span>

                            <h2>
                                {trainerName}
                            </h2>

                        </div>

                        <div className="trainer-avatar">
                            👨‍🏫
                        </div>

                    </div>


                    {trainer ? (

                        <div className="trainer-details">

                            <div className="trainer-detail">

                                <span>
                                    SPECIALIZATION
                                </span>

                                <strong>
                                    {trainer.specialization ||
                                        "Not specified"}
                                </strong>

                            </div>


                            <div className="trainer-detail">

                                <span>
                                    EXPERIENCE
                                </span>

                                <strong>
                                    {trainer.experienceYears ??
                                        0} Years
                                </strong>

                            </div>

                        </div>

                    ) : (

                        <div className="dashboard-no-data">
                            No trainer assigned yet.
                        </div>

                    )}


                    <button
                        className="dashboard-outline-button"
                        onClick={() =>
                            navigate(
                                "/member/trainer"
                            )
                        }
                    >
                        View Trainer
                        <span>→</span>
                    </button>

                </div>

            </section>


            {/* =================================
                PROFILE COMPLETION + MOTIVATION
            ================================= */}

            <section className="dashboard-bottom-grid">


                {/* PROFILE COMPLETION */}

                <div className="profile-progress-card">

                    <div className="progress-header">

                        <div>

                            <span>
                                YOUR PROFILE
                            </span>

                            <h2>
                                Profile Completion
                            </h2>

                        </div>

                        <strong>
                            {profilePercentage}%
                        </strong>

                    </div>


                    <div className="progress-track">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    `${profilePercentage}%`
                            }}
                        ></div>

                    </div>


                    <p>
                        Complete your profile to keep
                        your gym information up to date.
                    </p>


                    <button
                        onClick={() =>
                            navigate(
                                "/member/profile"
                            )
                        }
                    >
                        Update Profile →
                    </button>

                </div>


                {/* MOTIVATION */}

                <div className="motivation-card">

                    <div className="motivation-icon">
                        🔥
                    </div>

                    <div>

                        <span>
                            TODAY'S MOTIVATION
                        </span>

                        <h2>
                            Consistency beats motivation.
                        </h2>

                        <p>
                            Small progress every day
                            creates big results.
                        </p>

                    </div>

                </div>

            </section>


            {/* =================================
                QUICK ACTIONS
            ================================= */}

            <section className="quick-actions-section">

                <div className="quick-actions-heading">

                    <div>

                        <span>
                            QUICK ACCESS
                        </span>

                        <h2>
                            What do you want to do?
                        </h2>

                    </div>

                </div>


                <div className="member-quick-actions">


                    <button
                        onClick={() =>
                            navigate(
                                "/member/profile"
                            )
                        }
                    >

                        <div className="quick-action-icon">
                            👤
                        </div>

                        <strong>
                            My Profile
                        </strong>

                        <small>
                            Manage your information
                        </small>

                        <span className="quick-arrow">
                            →
                        </span>

                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/member/diet-plans"
                            )
                        }
                    >

                        <div className="quick-action-icon">
                            🥗
                        </div>

                        <strong>
                            Diet Plans
                        </strong>

                        <small>
                            Check your nutrition plan
                        </small>

                        <span className="quick-arrow">
                            →
                        </span>

                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/member/workout-plans"
                            )
                        }
                    >

                        <div className="quick-action-icon">
                            💪
                        </div>

                        <strong>
                            Workout Plans
                        </strong>

                        <small>
                            View your exercises
                        </small>

                        <span className="quick-arrow">
                            →
                        </span>

                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/member/gym"
                            )
                        }
                    >

                        <div className="quick-action-icon">
                            🏋️
                        </div>

                        <strong>
                            Gym Information
                        </strong>

                        <small>
                            Explore gym facilities
                        </small>

                        <span className="quick-arrow">
                            →
                        </span>

                    </button>


                </div>

            </section>

        </div>
    );
};

export default MemberDashboard;