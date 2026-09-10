import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MemberProfile.css";

const MemberProfile = () => {

    const [member, setMember] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        fetchProfile();

    }, []);


    const fetchProfile = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "/api/member/profile"
            );

            console.log(
                "Member Profile:",
                response.data
            );

            setMember(response.data);

        } catch (error) {

            console.error(
                "Profile API Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load profile"
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {

        return (
            <div className="member-profile-loading">
                Loading profile...
            </div>
        );

    }


    if (error) {

        return (
            <div className="member-profile-error">

                <h3>
                    Something went wrong
                </h3>

                <p>
                    {error}
                </p>

                <button
                    onClick={fetchProfile}
                >
                    Try Again
                </button>

            </div>
        );

    }


    if (!member) {

        return (
            <div className="member-profile-empty">
                No profile data found.
            </div>
        );

    }


    const user = member.user;


    return (
        <div className="member-profile-page">


            {/* PAGE HEADER */}

            <div className="member-profile-header">

                <div>

                    <span>
                        MEMBER PANEL
                    </span>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        View your personal and membership
                        information.
                    </p>

                </div>

            </div>


            {/* PROFILE CARD */}

            <div className="member-profile-card">


                {/* PROFILE TOP */}

                <div className="member-profile-top">

                    <div className="member-profile-avatar">

                        {user?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "M"}

                    </div>


                    <div>

                        <h2>
                            {user?.name || "Member"}
                        </h2>

                        <p>
                            {user?.email || "No email"}
                        </p>

                    </div>

                </div>


                {/* PERSONAL INFORMATION */}

                <div className="member-profile-section">

                    <h3>
                        Personal Information
                    </h3>


                    <div className="member-profile-grid">

                        <div className="member-profile-field">

                            <span>
                                Full Name
                            </span>

                            <strong>
                                {user?.name || "N/A"}
                            </strong>

                        </div>


                        <div className="member-profile-field">

                            <span>
                                Email
                            </span>

                            <strong>
                                {user?.email || "N/A"}
                            </strong>

                        </div>


                        <div className="member-profile-field">

                            <span>
                                Phone
                            </span>

                            <strong>
                                {user?.phone || "N/A"}
                            </strong>

                        </div>


                        <div className="member-profile-field">

                            <span>
                                Address
                            </span>

                            <strong>
                                {member.address || "N/A"}
                            </strong>

                        </div>


                        <div className="member-profile-field">

                            <span>
                                Emergency Contact
                            </span>

                            <strong>
                                {member.emergencyContact ||
                                    "N/A"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* MEMBERSHIP INFORMATION */}

                <div className="member-profile-section">

                    <h3>
                        Membership Information
                    </h3>


                    <div className="member-profile-grid">

                        <div className="member-profile-field">

                            <span>
                                Membership
                            </span>

                            <strong>
                                {member.membership?.name ||
                                    "Not Assigned"}
                            </strong>

                        </div>


                        <div className="member-profile-field">

                            <span>
                                Membership Status
                            </span>

                            <strong>
                                {member.membershipStatus ||
                                    "N/A"}
                            </strong>

                        </div>


                        <div className="member-profile-field">

                            <span>
                                Subscription
                            </span>

                            <strong>
                                {member.subscriptionStatus ||
                                    "N/A"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* TRAINER INFORMATION */}

                <div className="member-profile-section">

                    <h3>
                        Trainer Information
                    </h3>


                    {member.trainer ? (

                        <div className="member-profile-grid">

                            <div className="member-profile-field">

                                <span>
                                    Trainer Name
                                </span>

                                <strong>
                                    {member.trainer.user?.name ||
                                        "N/A"}
                                </strong>

                            </div>


                            <div className="member-profile-field">

                                <span>
                                    Specialization
                                </span>

                                <strong>
                                    {member.trainer.specialization ||
                                        "N/A"}
                                </strong>

                            </div>


                            <div className="member-profile-field">

                                <span>
                                    Experience
                                </span>

                                <strong>
                                    {member.trainer.experienceYears ??
                                        0} years
                                </strong>

                            </div>

                        </div>

                    ) : (

                        <p className="member-no-trainer">
                            No trainer assigned.
                        </p>

                    )}

                </div>

            </div>

        </div>
    );
};

export default MemberProfile;