import {
    Bell,
    LogOut,
    Menu
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const Navbar = ({ toggleSidebar }) => {

    const navigate = useNavigate();


    const handleLogout = () => {

        // Remove login data

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        // Redirect to login

        navigate("/login");

    };


    return (

        <header className="top-navbar">


            {/* LEFT SIDE */}

            <div className="navbar-left">


                {/* MOBILE MENU */}

                <button
                    className="mobile-menu-btn"
                    onClick={toggleSidebar}
                >

                    <Menu size={22} />

                </button>


                {/* LOGO */}

                <div className="navbar-logo">

                    <div className="navbar-logo-icon">

                        G

                    </div>


                    <div className="navbar-logo-text">

                        GYM<span>SYSTEM</span>

                    </div>

                </div>


                {/* NAVIGATION */}

                <div className="top-navigation">

                    <span className="top-nav-active">

                        Dashboard

                    </span>


                    <span>

                        Management

                    </span>


                    <span>

                        Reports

                    </span>

                </div>

            </div>



            {/* RIGHT SIDE */}

            <div className="navbar-right">


                {/* NOTIFICATION */}

                <button className="notification-button">

                    <Bell size={19} />

                    <span className="notification-dot"></span>

                </button>



                {/* USER */}

                <div className="navbar-user">


                    <div className="navbar-avatar">

                        A

                    </div>


                    <div className="navbar-user-info">

                        <strong>

                            Administrator

                        </strong>


                        <small>

                            ADMIN

                        </small>

                    </div>

                </div>



                {/* LOGOUT */}

                <button
                    className="navbar-logout"
                    onClick={handleLogout}
                >

                    <LogOut size={17} />

                    <span>

                        Sign Out

                    </span>

                </button>


            </div>


        </header>

    );

};


export default Navbar;