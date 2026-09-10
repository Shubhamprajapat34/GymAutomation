import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";


const Dashboard = () => {

    const { user } = useContext(AuthContext);

    const [summary, setSummary] = useState({
        assignedMembers: 0,
        activeMembers: 0,
        workoutPlans: 0,
        dietPlans: 0
    });

    const [recentMembers, setRecentMembers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            // we can put api according to our backend endpoints;

            const [
                membersResponse,
                workoutResponse,
                dietResponse
            ] = await Promise.all([

                api.get("/api/trainer/members"),

                api.get("/api/trainer/workout-plans"),

                api.get("/api/trainer/diet-plans")

            ]);


            const members = Array.isArray(membersResponse.data)
                ? membersResponse.data
                : [];


            const workoutPlans = Array.isArray(workoutResponse.data)
                ? workoutResponse.data
                : [];


            const dietPlans = Array.isArray(dietResponse.data)
                ? dietResponse.data
                : [];


            setSummary({

                assignedMembers: members.length,

                activeMembers: members.filter(
                    (member) =>
                        member.membershipStatus === "ACTIVE"
                ).length,

                workoutPlans: workoutPlans.length,

                dietPlans: dietPlans.length

            });


        
              //Show only first 5 members
             

            setRecentMembers(

                members.slice(0, 5)

            );

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

            setError(

                error.response?.data?.message ||

                "Unable to load trainer dashboard data."

            );

        } finally {

            setLoading(false);

        }

    };


    const stats = [

        {
            title: "Assigned Members",
            value: summary.assignedMembers,
            description: "Members under your guidance",
            className: "assigned"
        },

        {
            title: "Active Members",
            value: summary.activeMembers,
            description: "Currently active",
            className: "active"
        },

        {
            title: "Workout Plans",
            value: summary.workoutPlans,
            description: "Plans created",
            className: "workout"
        },

        {
            title: "Diet Plans",
            value: summary.dietPlans,
            description: "Plans created",
            className: "diet"
        }

    ];


    if (loading) {

        return (

            <div className="trainer-dashboard-loading">

                Loading Dashboard...

            </div>

        );

    }


    return (

        <section className="trainer-dashboard">


            {/* ================= HEADER ================= */}

            <div className="trainer-dashboard-header">

                <div>

                    <p className="trainer-breadcrumb">

                        Trainer / Dashboard

                    </p>


                    <h1>

                        Welcome back,

                        <span>

                            {user?.name || "Trainer"}

                        </span>

                    </h1>


                    <p className="trainer-dashboard-subtitle">

                        Manage your assigned members and
                        training plans.

                    </p>

                </div>


                <button
                    className="trainer-refresh-button"
                    onClick={loadDashboard}
                >

                    ↻ Refresh

                </button>

            </div>


            {/* ================= ERROR ================= */}

            {error && (

                <div className="trainer-dashboard-error">

                    {error}

                </div>

            )}


            {/* ================= STATS ================= */}

            <div className="trainer-stats-grid">

                {

                    stats.map((stat) => (

                        <div

                            key={stat.title}

                            className={`trainer-stat-card ${stat.className}`}

                        >

                            <span className="trainer-stat-title">

                                {stat.title}

                            </span>


                            <h2>

                                {stat.value}

                            </h2>


                            <small>

                                {stat.description}

                            </small>

                        </div>

                    ))

                }

            </div>


            {/* ================= MAIN CONTENT ================= */}

            <div className="trainer-dashboard-grid">


                {/* ================= ASSIGNED MEMBERS ================= */}

                <div className="trainer-dashboard-card">

                    <div className="trainer-card-header">

                        <div>

                            <p className="trainer-section-label">

                                YOUR MEMBERS

                            </p>


                            <h2>

                                Assigned Members

                            </h2>

                        </div>


                        <span className="trainer-total-count">

                            {summary.assignedMembers} Total

                        </span>

                    </div>


                    {

                        recentMembers.length === 0

                            ? (

                                <div className="trainer-empty-state">

                                    No assigned members found.

                                </div>

                            )

                            : (

                                <div className="trainer-members-list">

                                    {

                                        recentMembers.map((member) => (

                                            <div

                                                className="trainer-member-item"

                                                key={member.id}

                                            >


                                                {/* Avatar */}

                                                <div className="trainer-member-avatar">

                                                    {

                                                        member.name

                                                            ?.charAt(0)

                                                            ?.toUpperCase()

                                                            || "M"

                                                    }

                                                </div>


                                                {/* Information */}

                                                <div className="trainer-member-info">

                                                    <h3>

                                                        {member.name}

                                                    </h3>


                                                    <p>

                                                        {member.email}

                                                    </p>

                                                </div>


                                                {/* Status */}

                                                <span

                                                    className={

                                                        member.membershipStatus === "ACTIVE"

                                                            ? "trainer-status active"

                                                            : "trainer-status"

                                                    }

                                                >

                                                    {

                                                        member.membershipStatus

                                                            || "ASSIGNED"

                                                    }

                                                </span>


                                            </div>

                                        ))

                                    }

                                </div>

                            )

                    }


                    <Link

                        to="/trainer/members"

                        className="trainer-view-members-button"

                    >

                        View All Assigned Members →

                    </Link>

                </div>


                {/* ================= QUICK ACTIONS ================= */}

                <div className="trainer-dashboard-card">


                    <div className="trainer-card-header">

                        <div>

                            <p className="trainer-section-label">

                                WORKSPACE

                            </p>


                            <h2>

                                Plan Management

                            </h2>

                        </div>

                    </div>


                    <div className="trainer-actions-grid">


                        <Link

                            to="/trainer/workout-plan"

                            className="trainer-action-card"

                        >

                            <strong>

                                Create Workout Plan

                            </strong>

                            <span>

                                Build exercises and schedules

                            </span>

                        </Link>


                        <Link

                            to="/trainer/diet-plan"

                            className="trainer-action-card"

                        >

                            <strong>

                                Create Diet Plan

                            </strong>

                            <span>

                                Set meals and nutrition targets

                            </span>

                        </Link>


                        <Link

                            to="/trainer/members"

                            className="trainer-action-card"

                        >

                            <strong>

                                View Members

                            </strong>

                            <span>

                                Track assigned members

                            </span>

                        </Link>


                        <button

                            className="trainer-action-card trainer-action-button"

                            onClick={() => alert("Member progress feature coming soon")}

                        >

                            <strong>

                                View Progress

                            </strong>

                            <span>

                                Track member performance

                            </span>

                        </button>

                    </div>


                    {/* ================= PROGRESS ================= */}

                    <div className="trainer-progress-section">


                        <div className="trainer-progress-header">

                            <span>

                                Overall member progress

                            </span>

                            <strong>

                                75%

                            </strong>

                        </div>


                        <div className="trainer-progress-bar">

                            <div

                                className="trainer-progress-fill"

                            ></div>

                        </div>

                    </div>


                </div>

            </div>

        </section>

    );

};


export default Dashboard;