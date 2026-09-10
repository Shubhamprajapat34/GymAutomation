import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MemberTrainer.css";

const MemberTrainer = () => {

    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTrainer();
    }, []);

    const fetchTrainer = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/api/member/trainer"
            );

            console.log(
                "My Trainer:",
                response.data
            );

            setTrainer(response.data);

        } catch (error) {

            console.error(
                "Trainer API Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "No trainer assigned to you"
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {

        return (
            <div className="member-trainer-loading">
                Loading trainer information...
            </div>
        );

    }


    if (error) {

        return (
            <div className="member-trainer-empty">

                <div className="trainer-empty-icon">
                    👨‍🏫
                </div>

                <h2>
                    No Trainer Assigned
                </h2>

                <p>
                    {error}
                </p>

            </div>
        );

    }


    if (!trainer) {

        return (
            <div className="member-trainer-empty">
                No trainer information available.
            </div>
        );

    }


    const user = trainer.user;

    const trainerName =
        user?.name || "Trainer";


    return (
        <div className="member-trainer-page">


            {/* PAGE HEADER */}

            <div className="member-trainer-header">

                <span>
                    MEMBER PANEL
                </span>

                <h1>
                    My Trainer
                </h1>

                <p>
                    Get to know your personal fitness trainer.
                </p>

            </div>


            {/* TRAINER HERO */}

            <div className="trainer-profile-card">

                <div className="trainer-profile-background"></div>


                <div className="trainer-profile-content">


                    {/* AVATAR */}

                    <div className="trainer-big-avatar">

                        {trainerName
                            .charAt(0)
                            .toUpperCase()}

                    </div>


                    <div className="trainer-main-info">

                        <span className="trainer-role">
                            PERSONAL FITNESS TRAINER
                        </span>

                        <h2>
                            {trainerName}
                        </h2>

                        <p>
                            {trainer.specialization ||
                                "Fitness Trainer"}
                        </p>

                    </div>

                </div>

            </div>


            {/* INFORMATION */}

            <div className="trainer-info-grid">


                {/* EXPERIENCE */}

                <div className="trainer-info-card">

                    <div className="trainer-info-icon">
                        🏆
                    </div>

                    <span>
                        EXPERIENCE
                    </span>

                    <strong>
                        {trainer.experienceYears ?? 0}
                    </strong>

                    <small>
                        Years
                    </small>

                </div>


                {/* SPECIALIZATION */}

                <div className="trainer-info-card">

                    <div className="trainer-info-icon">
                        💪
                    </div>

                    <span>
                        SPECIALIZATION
                    </span>

                    <strong className="trainer-specialization">
                        {trainer.specialization ||
                            "Not specified"}
                    </strong>

                </div>


                {/* CONTACT */}

                <div className="trainer-info-card">

                    <div className="trainer-info-icon">
                        📧
                    </div>

                    <span>
                        EMAIL
                    </span>

                    <strong className="trainer-email">
                        {user?.email || "Not available"}
                    </strong>

                </div>


            </div>


            {/* ABOUT TRAINER */}

            <div className="trainer-about-card">

                <div className="trainer-about-heading">

                    <div className="trainer-about-icon">
                        ✨
                    </div>

                    <div>

                        <span>
                            ABOUT YOUR TRAINER
                        </span>

                        <h2>
                            Professional Profile
                        </h2>

                    </div>

                </div>


                <p>
                    {trainer.bio ||
                        "Your trainer has not added a bio yet."}
                </p>

            </div>


            {/* CONTACT */}

            <div className="trainer-contact-card">

                <div>

                    <span>
                        NEED HELP?
                    </span>

                    <h2>
                        Connect with your trainer
                    </h2>

                    <p>
                        Contact your trainer for guidance
                        about your workouts and fitness goals.
                    </p>

                </div>


                {user?.email && (

                    <a
                        href={`mailto:${user.email}`}
                        className="trainer-contact-button"
                    >
                        Email Trainer →
                    </a>

                )}

            </div>

        </div>
    );
};

export default MemberTrainer;