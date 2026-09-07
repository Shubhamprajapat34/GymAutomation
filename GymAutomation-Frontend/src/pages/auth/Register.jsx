import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerUser } from "../../services/authService";

const Register = () => {

    const navigate = useNavigate();
    const [role, setRole] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",

        // Trainer fields
        specialization: "",
        experienceYears: "",
        bio: "",

        // Member fields
        address: "",
        emergencyContact: "",


    });

    const handleChange = (e) => {
        const { name, value } = e.target;


        setFormData({
            ...formData,
            [name]: value,
        });


    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!role) {
            alert("Please select a role");
            return;
        }

        const registrationData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: role,
        };

        // Add Trainer fields only
        if (role === "TRAINER") {
            registrationData.specialization =
                formData.specialization;

            registrationData.experienceYears =
                Number(formData.experienceYears);

            registrationData.bio =
                formData.bio;
        }

        // Add Member fields only
        if (role === "MEMBER") {
            registrationData.address =
                formData.address;

            registrationData.emergencyContact =
                formData.emergencyContact;
        }

        console.log("sending Registration Data :", registrationData);

        // Backend API integration will be added next
        try {
            const response = await registerUser(registrationData);
            console.log("Registration success ", response);

            // succes message 
            alert(response.message || "registration successful!");

            // redirect to login page
            navigate("/login");


        } catch (error) {

            console.error("Registration Error:", error);
            alert(error.response?.data?.message ||
                error.message || "Registration failed!");
        }

    };

    return (
        <div className="auth-container">
            <div className="auth-card register-card">


                <h2>Gym Registration</h2>

                <form onSubmit={handleSubmit}>

                    {/* ROLE */}

                    <select
                        value={role}
                        onChange={handleRoleChange}
                        required
                    >
                        <option value="">
                            Select Role
                        </option>

                        <option value="ADMIN">
                            Admin
                        </option>

                        <option value="TRAINER">
                            Trainer
                        </option>

                        <option value="MEMBER">
                            Member
                        </option>

                    </select>


                    {/* COMMON FIELDS */}

                    {role && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}


                    {/* TRAINER FIELDS */}

                    {role === "TRAINER" && (
                        <>
                            <input
                                type="text"
                                name="specialization"
                                placeholder="Specialization (Example: Weight Training)"
                                value={formData.specialization}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="number"
                                name="experienceYears"
                                placeholder="Experience (Years)"
                                value={formData.experienceYears}
                                onChange={handleChange}
                                required
                            />

                            <textarea
                                name="bio"
                                placeholder="Tell us about yourself"
                                value={formData.bio}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}


                    {/* MEMBER FIELDS */}

                    {role === "MEMBER" && (
                        <>
                            <input
                                type="text"
                                name="address"
                                placeholder="Enter Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="emergencyContact"
                                placeholder="Emergency Contact Number"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}


                    {/* REGISTER BUTTON */}

                    {role && (
                        <button type="submit">
                            Register as {role}
                        </button>
                    )}

                </form>


                <p>
                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>
        </div>

    );
};

export default Register;
