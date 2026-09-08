import { useContext, useEffect, useState } from "react";

import {

    Users,
    UserCheck,
    Dumbbell,
    CreditCard,
    ArrowRight,
    Building2,
    RefreshCw

} from "lucide-react";

import { Link } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";


const Dashboard = () => {


    const { user } = useContext(AuthContext);


    const [summary, setSummary] = useState({

        members: 0,

        activeMembers: 0,

        trainers: 0,

        memberships: 0

    });


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState("");


    // =====================================
    // LOAD DASHBOARD DATA
    // =====================================

    const loadDashboardData = async () => {

        try {

            setLoading(true);

            setError("");


            const [

                membersResponse,

                trainersResponse,

                membershipsResponse

            ] = await Promise.all([

                api.get("/api/admin/members"),

                api.get("/api/admin/trainers"),

                api.get("/api/memberships")

            ]);


            const members = membersResponse.data || [];

            const trainers = trainersResponse.data || [];

            const memberships = membershipsResponse.data || [];


            // Count active members

            const activeMembers = members.filter(

                (member) =>

                    member.membershipStatus === "ACTIVE"

            ).length;


            // Set dynamic dashboard data

            setSummary({

                members: members.length,

                activeMembers: activeMembers,

                trainers: trainers.length,

                memberships: memberships.length

            });


        } catch (error) {

            console.error(

                "Dashboard API Error:",

                error

            );


            setError(

                "Unable to load dashboard data. Please check your backend APIs."

            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // CALL API WHEN PAGE LOADS
    // =====================================

    useEffect(() => {

        loadDashboardData();

    }, []);



    // =====================================
    // DASHBOARD STATISTICS
    // =====================================

    const statistics = [

        {

            title: "Total Members",

            value: summary.members,

            description: "Registered gym members",

            icon: <Users size={24} />,

            color: "gold"

        },


        {

            title: "Active Members",

            value: summary.activeMembers,

            description: "Currently active",

            icon: <UserCheck size={24} />,

            color: "green"

        },


        {

            title: "Total Trainers",

            value: summary.trainers,

            description: "Available trainers",

            icon: <Dumbbell size={24} />,

            color: "blue"

        },


        {

            title: "Membership Plans",

            value: summary.memberships,

            description: "Available plans",

            icon: <CreditCard size={24} />,

            color: "purple"

        }

    ];



    return (

        <div className="dashboard-page">


            {/* =============================
                HEADER
            ============================== */}

            <div className="dashboard-header">


                <div>


                    <p className="dashboard-breadcrumb">

                        Admin / Dashboard

                    </p>


                    <h1>

                        Welcome back,

                        <span>

                            {user?.name || "Administrator"}

                        </span>

                    </h1>


                    <p className="dashboard-description">

                        Manage your gym and monitor everything from one place.

                    </p>


                </div>


                {/* REFRESH BUTTON */}

                <button

                    className="refresh-button"

                    onClick={loadDashboardData}

                    disabled={loading}

                >

                    <RefreshCw

                        size={18}

                        className={

                            loading

                                ? "rotate-icon"

                                : ""

                        }

                    />

                    Refresh

                </button>


            </div>



            {/* =============================
                ERROR MESSAGE
            ============================== */}

            {

                error && (

                    <div className="dashboard-error">

                        {error}


                        <button

                            onClick={loadDashboardData}

                        >

                            Try Again

                        </button>

                    </div>

                )

            }



            {/* =============================
                ACTION BUTTONS
            ============================== */}

            <div className="dashboard-actions">


                <Link

                    to="/admin/members"

                    className="dashboard-action"

                >

                    <Users size={18} />

                    Members

                </Link>



                <Link

                    to="/admin/trainers"

                    className="dashboard-action"

                >

                    <Dumbbell size={18} />

                    Trainers

                </Link>



                <Link

                    to="/admin/memberships"

                    className="dashboard-action"

                >

                    <CreditCard size={18} />

                    Memberships

                </Link>


            </div>



            {/* =============================
                STATISTICS
            ============================== */}

            <div className="dashboard-stats">


                {

                    statistics.map(

                        (stat) => (

                            <div

                                key={stat.title}

                                className={`stat-card ${stat.color}`}

                            >


                                <div className="stat-card-header">


                                    <div>


                                        <p>

                                            {stat.title}

                                        </p>


                                        <h2>

                                            {

                                                loading

                                                    ? "..."

                                                    : stat.value

                                            }

                                        </h2>


                                    </div>



                                    <div className="stat-card-icon">

                                        {stat.icon}

                                    </div>


                                </div>


                                <small>

                                    {stat.description}

                                </small>


                            </div>

                        )

                    )

                }


            </div>



            {/* =============================
                LOWER SECTION
            ============================== */}

            <div className="dashboard-lower-section">


                {/* QUICK ACTIONS */}

                <div className="dashboard-box">


                    <div className="box-header">


                        <div>


                            <p className="box-label">

                                MANAGEMENT

                            </p>


                            <h2>

                                Quick Actions

                            </h2>


                        </div>


                    </div>



                    <div className="quick-actions">


                        <Link

                            to="/admin/members"

                            className="quick-action-card"

                        >

                            <div className="quick-action-icon">

                                <Users size={22} />

                            </div>


                            <div>


                                <h3>

                                    Manage Members

                                </h3>


                                <p>

                                    View and manage gym members

                                </p>


                            </div>


                            <ArrowRight size={20} />


                        </Link>



                        <Link

                            to="/admin/trainers"

                            className="quick-action-card"

                        >

                            <div className="quick-action-icon green-icon">

                                <Dumbbell size={22} />

                            </div>


                            <div>


                                <h3>

                                    Manage Trainers

                                </h3>


                                <p>

                                    Manage trainers and assignments

                                </p>


                            </div>


                            <ArrowRight size={20} />


                        </Link>



                        <Link

                            to="/admin/memberships"

                            className="quick-action-card"

                        >

                            <div className="quick-action-icon blue-icon">

                                <CreditCard size={22} />

                            </div>


                            <div>


                                <h3>

                                    Membership Plans

                                </h3>


                                <p>

                                    Create and manage plans

                                </p>


                            </div>


                            <ArrowRight size={20} />


                        </Link>



                        <Link

                            to="/admin/payments"

                            className="quick-action-card"

                        >

                            <div className="quick-action-icon purple-icon">

                                <CreditCard size={22} />

                            </div>


                            <div>


                                <h3>

                                    Payments

                                </h3>


                                <p>

                                    View payment history

                                </p>


                            </div>


                            <ArrowRight size={20} />


                        </Link>


                    </div>


                </div>



                {/* =============================
                    GYM OVERVIEW
                ============================== */}

                <div className="dashboard-box gym-overview-box">


                    <div className="gym-title">


                        <div className="gym-icon">

                            <Building2 size={22} />

                        </div>


                        <div>


                            <p className="box-label">

                                GYM STATUS

                            </p>


                            <h2>

                                Gym Overview

                            </h2>


                        </div>


                    </div>



                    <div className="gym-overview-item">


                        <span>

                            Total Members

                        </span>


                        <strong>

                            {summary.members}

                        </strong>


                    </div>



                    <div className="gym-overview-item">


                        <span>

                            Active Members

                        </span>


                        <strong>

                            {summary.activeMembers}

                        </strong>


                    </div>



                    <div className="gym-overview-item">


                        <span>

                            Trainers

                        </span>


                        <strong>

                            {summary.trainers}

                        </strong>


                    </div>



                    <div className="gym-overview-item">


                        <span>

                            Membership Plans

                        </span>


                        <strong>

                            {summary.memberships}

                        </strong>


                    </div>



                    <Link

                        to="/admin/gym"

                        className="view-gym-button"

                    >

                        View Gym Information

                        <ArrowRight size={18} />

                    </Link>


                </div>


            </div>


        </div>

    );

};


export default Dashboard;


