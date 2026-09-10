import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    Dumbbell,
    Utensils
} from "lucide-react";


const TrainerSidebar = () => {

    const menuItems = [

        {
            name: "Dashboard",
            path: "/trainer/dashboard",
            icon: <LayoutDashboard size={20} />
        },

        {
            name: "Assigned Members",
            path: "/trainer/members",
            icon: <Users size={20} />
        },

        {
            name: "Workout Plans",
            path: "/trainer/workout-plan",
            icon: <Dumbbell size={20} />
        },

        {
            name: "Diet Plans",
            path: "/trainer/diet-plan",
            icon: <Utensils size={20} />
        }

    ];


    return (

        <aside className="trainer-sidebar">


            {/* Logo */}

            <div className="trainer-brand">

                <div className="trainer-brand-icon">

                    G

                </div>

                <span>

                    GYMFLOW

                </span>

            </div>


            {/* Panel Title */}

            <p className="trainer-panel-title">

                TRAINER PANEL

            </p>


            {/* Navigation */}

            <nav className="trainer-menu">

                {

                    menuItems.map((item) => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                isActive

                                    ? "trainer-menu-item active"

                                    : "trainer-menu-item"

                            }

                        >

                            {item.icon}

                            <span>

                                {item.name}

                            </span>

                        </NavLink>

                    ))

                }

            </nav>

        </aside>

    );

};


export default TrainerSidebar;