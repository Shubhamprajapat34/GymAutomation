import { Outlet } from "react-router-dom";

import TrainerSidebar from "../components/common/TrainerSidebar";
import TrainerNavbar from "../components/common/TrainerNavbar";



const TrainerLayout = () => {

    return (

        <div className="trainer-layout">

            {/* Left Sidebar */}

            <TrainerSidebar />


            {/* Right Side */}

            <div className="trainer-main">


                {/* Top Navbar */}

                <TrainerNavbar />


                {/* Dynamic Page Content */}

                <main className="trainer-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};


export default TrainerLayout;