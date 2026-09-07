import { useState, useContext } from "react";


import {
    useNavigate,
} from "react-router-dom";

import { login as loginRequest } from "../../services/authService";

import {
    AuthContext,
} from "../../context/AuthContext";


const Login = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();


        try {

            const response = await loginRequest({

                email,
                password,

            });


            console.log("login.response is :", response);


            login(response);


            const role = response.role;


            if (role === "ADMIN") {

                navigate("/admin/dashboard");

            }

            else if (role === "TRAINER") {

                navigate("/trainer/dashboard");

            }

            else if (role === "MEMBER") {

                navigate("/member/dashboard");

            }

            else {
                alert("Invalid Role");
            }


        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Invalid Email or Password"

            );

        }

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>
                    Gym Login
                </h2>


                <form onSubmit={handleLogin}>


                    <input

                        type="email"

                        placeholder="Enter Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                        required

                    />


                    <input

                        type="password"

                        placeholder="Enter Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                        required

                    />


                    <button type="submit">

                        Login

                    </button>


                </form>


                <p>

                    Don't have an account?

                    <span

                        onClick={() =>
                            navigate("/register")
                        }

                        style={{
                            cursor: "pointer",
                            color: "blue",
                        }}

                    >

                        Register

                    </span>

                </p>


            </div>

        </div>

    );

};


export default Login;