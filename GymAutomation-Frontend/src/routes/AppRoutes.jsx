
import {

    Navigate,
    Route,
    Routes

} from "react-router-dom";


import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Members from "../pages/admin/Members";
import Trainers from "../pages/admin/Trainers";
import Memberships from "../pages/admin/Memberships";
import Gym from "../pages/admin/Gym";


import TrainerLayout from "../layouts/TrainerLayout";
import TrainerDashboard from "../pages/trainer/Dashboard";
import AssignedMembers from "../pages/trainer/AssignedMembers";
import CreateWorkoutPlan from "../pages/trainer/CreateWorkoutPlan";
import CreateDietPlan from "../pages/trainer/CreateDietPlan";

import MemberLayout from "../layouts/MemberLayout";
import MemberDashboard from "../pages/member/MemberDashboard";
import MemberProfile from "../pages/member/MemberProfile";
import MemberDiet from "../pages/member/MemberDiet";
import MemberWorkouts from "../pages/member/MemberWorkouts";
import MemberMembership from "../pages/member/MemberMembership";
import GymInformation from "../pages/member/GymInformation";
import MemberTrainer from "../pages/member/MemberTrainer";

const AppRoutes = () => {

    return (

        <Routes>


            {/* DEFAULT */}

            <Route path="/" element={ <Navigate to="/login" /> } />


            {/* AUTH */}

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />


            {/*================== ADMIN  ROUTES==================*/}

            <Route path="/admin" element={
                          <ProtectedRoute allowedRole="ADMIN">

                                 <AdminLayout />

                           </ProtectedRoute>
            }
            >

                <Route index element={ <Navigate to="dashboard" />}/>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="members" element={<Members />} />
                <Route path="trainers" element={<Trainers />} />
                <Route path="memberships" element={ <Memberships /> } />
                <Route path="Gym" element={<Gym />} />
                
           
            </Route>

        {/* ================= TRAINER ROUTES ================= */}

        <Route path="/trainer" element={
                    <ProtectedRoute allowedRole="TRAINER">
                            <TrainerLayout />
                         </ProtectedRoute>
                      }>


           <Route index element={<Navigate to="dashboard" />}/>

           <Route path="dashboard" element={<TrainerDashboard />}/>

           <Route path="members" element={<AssignedMembers />}/>

           <Route path="workout-plan" element={<CreateWorkoutPlan />}/>

           <Route path="diet-plan" element={<CreateDietPlan />} />

        </Route>

        {/* ================= MEMBER ROUTES ================= */}
       
        <Route path="/member" element={<MemberLayout />} >

        <Route path="dashboard" element={<MemberDashboard />}/>

        <Route path="profile" element={<MemberProfile />}/>

        <Route path="trainer" element={<MemberTrainer />}/>

        <Route path="diet-plans" element={<MemberDiet/>} />

        <Route path="workout-plans" element={<MemberWorkouts />}/>

        <Route path="membership" element={<MemberMembership />} />

        <Route path="gym" element={<GymInformation />}/>

         </Route>


        </Routes>

    );

};


export default AppRoutes;
