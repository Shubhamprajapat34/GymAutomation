import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import {
    Bell,
    LogOut
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";


const TrainerNavbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <header className="trainer-navbar">


            {/* Left */}

            <div className="trainer-navbar-left">

                <span>

                    Trainer Workspace

                </span>

            </div>


            {/* Right */}

            <div className="trainer-navbar-right">


                {/* Notification */}

                <button
                    className="trainer-notification-button"
                >

                    <Bell size={20} />

                </button>


                {/* Trainer Information */}

                <div className="trainer-user-info">

                    <div className="trainer-avatar">

                        {

                            user?.name

                                ? user.name.charAt(0).toUpperCase()

                                : "T"

                        }

                    </div>


                    <div className="trainer-user-text">

                        <strong>

                            {user?.name || "Trainer"}

                        </strong>

                        <span>

                            TRAINER

                        </span>

                    </div>

                </div>


                {/* Logout */}

                <button

                    className="trainer-logout-button"

                    onClick={handleLogout}

                >

                    <LogOut size={18} />

                    <span>

                        Logout

                    </span>

                </button>

            </div>

        </header>

    );

};


export default TrainerNavbar;