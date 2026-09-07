import {

    LayoutDashboard,
    Users,
    Dumbbell,
    CreditCard,
    ReceiptText,
    Building2,
    X

} from "lucide-react";


import { NavLink } from "react-router-dom";


const Sidebar = ({

    sidebarOpen,

    closeSidebar

}) => {


    const menuItems = [


        {

            name: "Dashboard",

            icon: <LayoutDashboard size={20} />,

            path: "/admin/dashboard"

        },


        {

            name: "Members",

            icon: <Users size={20} />,

            path: "/admin/members"

        },


        {

            name: "Trainers",

            icon: <Dumbbell size={20} />,

            path: "/admin/trainers"

        },


        {

            name: "Memberships",

            icon: <CreditCard size={20} />,

            path: "/admin/memberships"

        },


        {

            name: "Payments",

            icon: <ReceiptText size={20} />,

            path: "/admin/payments"

        },


        {

            name: "Gym Information",

            icon: <Building2 size={20} />,

            path: "/admin/gym"

        }

    ];



    return (

        <>


            {/* MOBILE OVERLAY */}

            {sidebarOpen && (

                <div

                    className="sidebar-overlay"

                    onClick={closeSidebar}

                ></div>

            )}



            {/* SIDEBAR */}

            <aside

                className={`admin-sidebar ${
                    sidebarOpen
                        ? "admin-sidebar-open"
                        : ""
                }`}

            >


                {/* MOBILE HEADER */}

                <div className="sidebar-mobile-top">


                    <strong>

                        Menu

                    </strong>


                    <button
                        onClick={closeSidebar}
                    >

                        <X size={22} />

                    </button>


                </div>



                {/* TITLE */}

                <p className="sidebar-heading">

                    ADMIN PANEL

                </p>



                {/* MENU */}

                <nav className="sidebar-navigation">


                    {

                        menuItems.map((item) => (

                            <NavLink

                                key={item.name}

                                to={item.path}

                                className={

                                    ({ isActive }) =>

                                        `sidebar-link ${
                                            isActive
                                                ? "sidebar-link-active"
                                                : ""
                                        }`

                                }

                                onClick={closeSidebar}

                            >


                                <span className="sidebar-icon">

                                    {item.icon}

                                </span>


                                <span>

                                    {item.name}

                                </span>


                            </NavLink>

                        ))

                    }


                </nav>


            </aside>


        </>

    );

};


export default Sidebar;