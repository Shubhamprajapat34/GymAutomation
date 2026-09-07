import { useState } from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";

import Sidebar from "../components/common/Sidebar";


const AdminLayout = () => {


    const [sidebarOpen, setSidebarOpen] = useState(false);



    const toggleSidebar = () => {

        setSidebarOpen((previous) => !previous);

    };



    const closeSidebar = () => {

        setSidebarOpen(false);

    };



    return (

        <div className="admin-layout">


            {/* TOP NAVBAR */}

            <Navbar

                toggleSidebar={toggleSidebar}

            />


            {/* LEFT SIDEBAR */}

            <Sidebar

                sidebarOpen={sidebarOpen}

                closeSidebar={closeSidebar}

            />


            {/* PAGE CONTENT */}

            <main className="admin-content">

                <Outlet />

            </main>


        </div>

    );

};


export default AdminLayout;