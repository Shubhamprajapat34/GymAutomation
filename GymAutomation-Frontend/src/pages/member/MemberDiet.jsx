import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MemberDiet.css";

const MemberDiet = () => {

    const [dietPlans, setDietPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDietPlans = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get(
                    "/api/member/diet-plans"
                );

                setDietPlans(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

            } catch (err) {

                console.error("Diet plan error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load your diet plans."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchDietPlans();

    }, []);

    if (loading) {
        return (
            <div className="diet-loading">
                <div className="diet-spinner"></div>
                <p>Loading your diet plans...</p>
            </div>
        );
    }

    return (
        <div className="diet-page">

            {/* HEADER */}

            <div className="diet-header">

                <div className="diet-header-content">

                    <div className="diet-icon">
                        🥗
                    </div>

                    <div>
                        <p className="diet-small-title">
                            NUTRITION
                        </p>

                        <h1>
                            My Diet Plans
                        </h1>

                        <p>
                            Follow your personalized nutrition plan
                            and stay consistent with your fitness goals.
                        </p>
                    </div>

                </div>

                <div className="diet-count">

                    <span>{dietPlans.length}</span>

                    <small>
                        {dietPlans.length === 1
                            ? "Active Plan"
                            : "Active Plans"}
                    </small>

                </div>

            </div>


            {/* ERROR */}

            {error && (
                <div className="diet-error">
                    <span>⚠️</span>
                    <div>
                        <strong>Unable to load diet plans</strong>
                        <p>{error}</p>
                    </div>
                </div>
            )}


            {/* EMPTY */}

            {!error && dietPlans.length === 0 && (

                <div className="diet-empty">

                    <div className="diet-empty-icon">
                        🥑
                    </div>

                    <h2>
                        No Diet Plan Yet
                    </h2>

                    <p>
                        Your trainer hasn't assigned a diet plan
                        to you yet.
                    </p>

                </div>

            )}


            {/* DIET CARDS */}

            {!error && dietPlans.length > 0 && (

                <div className="diet-grid">

                    {dietPlans.map((diet, index) => (

                        <div
                            className="diet-card"
                            key={diet.id || index}
                        >

                            <div className="diet-card-top">

                                <div className="diet-card-number">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <span className="diet-status">
                                    ACTIVE
                                </span>

                            </div>


                            <div className="diet-card-icon">
                                🥗
                            </div>


                            <h2>
                                {diet.title || "Nutrition Plan"}
                            </h2>


                            <div className="diet-divider"></div>


                            <div className="diet-details">

                                <h4>
                                    📋 Plan Details
                                </h4>

                                <p>
                                    {diet.details ||
                                        "No details available for this diet plan."}
                                </p>

                            </div>


                            {/* TRAINER */}

                            {diet.trainer && (

                                <div className="diet-trainer">

                                    <div className="diet-trainer-avatar">
                                        {(
                                            diet.trainer.user?.name ||
                                            "T"
                                        ).charAt(0).toUpperCase()}
                                    </div>

                                    <div>

                                        <span>
                                            Assigned by
                                        </span>

                                        <strong>
                                            {diet.trainer.user?.name ||
                                                "Your Trainer"}
                                        </strong>

                                    </div>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default MemberDiet;