import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MemberWorkouts.css";

const MemberWorkouts = () => {

    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchWorkoutPlans = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get(
                    "/api/member/workout-plans"
                );

                setWorkoutPlans(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );

            } catch (err) {

                console.error(
                    "Workout plan error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load your workout plans."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchWorkoutPlans();

    }, []);


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (
            <div className="workout-loading">

                <div className="workout-spinner"></div>

                <p>
                    Loading your workout plans...
                </p>

            </div>
        );
    }


    return (

        <div className="workout-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="workout-header">

                <div className="workout-header-content">

                    <div className="workout-header-icon">
                        💪
                    </div>

                    <div>

                        <p className="workout-label">
                            TRAINING
                        </p>

                        <h1>
                            My Workout Plans
                        </h1>

                        <p>
                            Follow your personalized training
                            plan and keep pushing towards your goals.
                        </p>

                    </div>

                </div>


                <div className="workout-count">

                    <span>
                        {workoutPlans.length}
                    </span>

                    <small>
                        {workoutPlans.length === 1
                            ? "Workout Plan"
                            : "Workout Plans"}
                    </small>

                </div>

            </div>


            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <div className="workout-error">

                    <span>
                        ⚠️
                    </span>

                    <div>

                        <strong>
                            Unable to load workout plans
                        </strong>

                        <p>
                            {error}
                        </p>

                    </div>

                </div>
            )}


            {/* =========================
                EMPTY
            ========================= */}

            {!error && workoutPlans.length === 0 && (

                <div className="workout-empty">

                    <div className="workout-empty-icon">
                        🏋️
                    </div>

                    <h2>
                        No Workout Plan Yet
                    </h2>

                    <p>
                        Your trainer hasn't assigned a workout
                        plan to you yet.
                    </p>

                </div>

            )}


            {/* =========================
                WORKOUT CARDS
            ========================= */}

            {!error && workoutPlans.length > 0 && (

                <div className="workout-grid">

                    {workoutPlans.map(
                        (workout, index) => (

                            <div
                                className="workout-card"
                                key={
                                    workout.id || index
                                }
                            >

                                {/* TOP */}

                                <div className="workout-card-top">

                                    <div className="workout-number">
                                        {String(
                                            index + 1
                                        ).padStart(2, "0")}
                                    </div>

                                    <span className="workout-status">
                                        ACTIVE
                                    </span>

                                </div>


                                {/* ICON */}

                                <div className="workout-card-icon">
                                    💪
                                </div>


                                {/* TITLE */}

                                <h2>
                                    {workout.title ||
                                        "Workout Plan"}
                                </h2>


                                <div className="workout-divider"></div>


                                {/* DETAILS */}

                                <div className="workout-details">

                                    <h4>
                                        <span>📋</span>
                                        Training Details
                                    </h4>

                                    <p>
                                        {workout.details ||
                                            "No workout details available."}
                                    </p>

                                </div>


                                {/* TRAINER */}

                                {workout.trainer && (

                                    <div className="workout-trainer">

                                        <div className="workout-trainer-avatar">

                                            {(
                                                workout
                                                    .trainer
                                                    .user
                                                    ?.name ||
                                                "T"
                                            )
                                                .charAt(0)
                                                .toUpperCase()}

                                        </div>


                                        <div>

                                            <span>
                                                Assigned by
                                            </span>

                                            <strong>
                                                {
                                                    workout
                                                        .trainer
                                                        .user
                                                        ?.name ||
                                                    "Your Trainer"
                                                }
                                            </strong>

                                        </div>

                                    </div>

                                )}

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
};

export default MemberWorkouts;