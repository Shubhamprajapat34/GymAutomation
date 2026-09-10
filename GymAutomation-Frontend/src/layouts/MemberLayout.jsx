import { NavLink, Outlet, useNavigate } from "react-router-dom";

const MemberLayout = () => {

    const navigate = useNavigate();


    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };


    return (

        <div className="member-layout">


            {/* ================= SIDEBAR ================= */}

            <aside className="member-sidebar">


                <div className="member-logo">

                    GYMFLOW

                </div>


                <div className="member-sidebar-title">

                    MEMBER PANEL

                </div>


                <nav className="member-navigation">


                    <NavLink
                        to="/member/dashboard"
                    >
                        🏠 Dashboard
                    </NavLink>


                    <NavLink
                        to="/member/profile"
                    >
                        👤 My Profile
                    </NavLink>


                    <NavLink
                        to="/member/trainer"
                    >
                        👨‍🏫 My Trainer
                    </NavLink>


                    <NavLink
                        to="/member/diet-plans"
                    >
                        🥗 Diet Plans
                    </NavLink>


                    <NavLink
                        to="/member/workout-plans"
                    >
                        💪 Workout Plans
                    </NavLink>


                    <NavLink
                        to="/member/membership"
                    >
                        ⭐ My Membership
                    </NavLink>


                    <NavLink
                        to="/member/gym"
                    >
                        🏋️ Gym Information
                    </NavLink>


                </nav>


                {/* LOGOUT */}

                <button
                    className="member-logout-button"
                    onClick={handleLogout}
                >

                    Logout

                </button>


            </aside>



            {/* ================= MAIN AREA ================= */}

            <main className="member-main-content">


                <header className="member-topbar">


                    <div>

                        Member Dashboard

                    </div>


                    <div className="member-user-info">

                        <div className="member-avatar">

                            M

                        </div>


                        <span>

                            Member

                        </span>

                    </div>


                </header>



                {/* PAGE CONTENT */}

                <div className="member-page-content">

                    <Outlet />

                </div>


            </main>


        </div>

    );

};


export default MemberLayout;