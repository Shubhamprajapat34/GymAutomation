import { useEffect, useState } from "react";
import api from "../../services/api";
import "./GymInformation.css";

const GymInformation = () => {

    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchGymInformation = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get("/api/gym");

                setGym(response.data);

            } catch (err) {

                console.error(
                    "Gym information error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load gym information."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchGymInformation();

    }, []);

    if (loading) {

        return (
            <div className="gym-info-loading">

                <div className="gym-info-spinner"></div>

                <p>
                    Loading gym information...
                </p>

            </div>
        );
    }


    if (error) {

        return (
            <div className="gym-info-page">

                <div className="gym-info-error">

                    <span>
                        ⚠️
                    </span>

                    <div>

                        <strong>
                            Unable to load gym information
                        </strong>

                        <p>
                            {error}
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    if (!gym) {

        return (
            <div className="gym-info-page">

                <div className="gym-info-empty">

                    <div className="gym-empty-icon">
                        🏋️
                    </div>

                    <h2>
                        Gym Information Not Available
                    </h2>

                    <p>
                        Gym information has not been configured yet.
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="gym-info-page">

            {/* =========================
                HERO
            ========================= */}

            <section className="gym-info-hero">

                <div className="gym-hero-content">

                    <div className="gym-hero-icon">
                        🏋️
                    </div>

                    <div>

                        <span className="gym-hero-label">
                            YOUR FITNESS HOME
                        </span>

                        <h1>
                            {gym.name || "Our Gym"}
                        </h1>

                        <p>
                            Everything you need to know
                            about your gym.
                        </p>

                    </div>

                </div>


                <div className="gym-open-badge">

                    <span></span>

                    MEMBER ACCESS

                </div>

            </section>


            {/* =========================
                QUICK INFO
            ========================= */}

            <section className="gym-info-grid">

                <div className="gym-info-card">

                    <div className="gym-card-icon location">
                        📍
                    </div>

                    <div>

                        <span>
                            LOCATION
                        </span>

                        <strong>
                            {gym.address || "Not Available"}
                        </strong>

                    </div>

                </div>


                <div className="gym-info-card">

                    <div className="gym-card-icon phone">
                        📞
                    </div>

                    <div>

                        <span>
                            PHONE
                        </span>

                        <strong>
                            {gym.phone || "Not Available"}
                        </strong>

                    </div>

                </div>


                <div className="gym-info-card">

                    <div className="gym-card-icon email">
                        ✉️
                    </div>

                    <div>

                        <span>
                            EMAIL
                        </span>

                        <strong>
                            {gym.email || "Not Available"}
                        </strong>

                    </div>

                </div>

            </section>


            {/* =========================
                ABOUT GYM
            ========================= */}

            <section className="gym-about">

                <div className="gym-section-heading">

                    <div className="gym-section-icon">
                        ✨
                    </div>

                    <div>

                        <span>
                            ABOUT THE GYM
                        </span>

                        <h2>
                            Your Fitness Journey Starts Here
                        </h2>

                    </div>

                </div>


                <p className="gym-description">

                    {gym.description ||
                        "Welcome to our gym. We are committed to helping you achieve your fitness goals with professional guidance, quality equipment and a motivating environment."}

                </p>

            </section>


            {/* =========================
                FACILITIES
            ========================= */}

            <section className="gym-facilities">

                <div className="gym-section-heading">

                    <div className="gym-section-icon blue">
                        🏆
                    </div>

                    <div>

                        <span>
                            MEMBER EXPERIENCE
                        </span>

                        <h2>
                            What You Can Expect
                        </h2>

                    </div>

                </div>


                <div className="facility-grid">

                    <div className="facility-card">

                        <div className="facility-icon">
                            💪
                        </div>

                        <h3>
                            Strength Training
                        </h3>

                        <p>
                            Build strength and improve
                            your overall fitness.
                        </p>

                    </div>


                    <div className="facility-card">

                        <div className="facility-icon">
                            🏃
                        </div>

                        <h3>
                            Cardio Training
                        </h3>

                        <p>
                            Improve stamina and maintain
                            cardiovascular fitness.
                        </p>

                    </div>


                    <div className="facility-card">

                        <div className="facility-icon">
                            🧘
                        </div>

                        <h3>
                            Fitness Guidance
                        </h3>

                        <p>
                            Get guidance through your
                            personalized training plan.
                        </p>

                    </div>


                    <div className="facility-card">

                        <div className="facility-icon">
                            🥗
                        </div>

                        <h3>
                            Nutrition Support
                        </h3>

                        <p>
                            Follow personalized diet plans
                            created for your goals.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================
                CONTACT
            ========================= */}

            <section className="gym-contact">

                <div>

                    <span>
                        NEED HELP?
                    </span>

                    <h2>
                        Contact Your Gym
                    </h2>

                    <p>
                        For questions about gym facilities,
                        membership or general information,
                        contact the gym directly.
                    </p>

                </div>


                <div className="gym-contact-actions">

                    {gym.phone && (

                        <a
                            href={`tel:${gym.phone}`}
                            className="gym-contact-button"
                        >
                            📞 Call Gym
                        </a>

                    )}


                    {gym.email && (

                        <a
                            href={`mailto:${gym.email}`}
                            className="gym-contact-button secondary"
                        >
                            ✉️ Email Gym
                        </a>

                    )}

                </div>

            </section>

        </div>
    );
};

export default GymInformation;