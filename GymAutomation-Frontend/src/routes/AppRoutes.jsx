
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


const AppRoutes = () => {

    return (

        <Routes>


            {/* DEFAULT */}

            <Route

                path="/"

                element={
                    <Navigate to="/login" />
                }

            />


            {/* AUTH */}

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />


            {/* ADMIN */}

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


        </Routes>

    );

};


export default AppRoutes;
