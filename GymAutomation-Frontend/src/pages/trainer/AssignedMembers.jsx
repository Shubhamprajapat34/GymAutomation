import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./AssignedMembers.css";

const AssignedMembers = () => {

    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ===============================
    // LOAD ASSIGNED MEMBERS
    // ===============================

    const loadMembers = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "/api/trainer/members"
            );

            console.log(
                "Assigned Members:",
                response.data
            );


            const memberData = Array.isArray(response.data)
                ? response.data
                : [];


            const normalizedMembers = memberData.map((member) => ({
                ...member,
                name: member.name || member.user?.name,
                email: member.email || member.user?.email,
                phone: member.phone || member.user?.phone
            }));

            setMembers(normalizedMembers);

            setFilteredMembers(normalizedMembers);

        } catch (error) {

            console.error(
                "Error loading members:",
                error
            );

            setError(

                error.response?.data?.message ||

                "Unable to load assigned members."

            );

        } finally {

            setLoading(false);

        }

    };


    // ===============================
    // LOAD DATA WHEN PAGE OPENS
    // ===============================

    useEffect(() => {

        const timeoutId = window.setTimeout(() => {
            loadMembers();
        }, 0);

        return () => window.clearTimeout(timeoutId);

    }, []);


    // ===============================
    // SEARCH MEMBERS
    // ===============================

    const handleSearch = (event) => {

        const value = event.target.value;

        setSearch(value);


        const filtered = members.filter((member) =>

            member.name
                ?.toLowerCase()
                .includes(value.toLowerCase())

            ||

            member.email
                ?.toLowerCase()
                .includes(value.toLowerCase())

            ||

            member.phone
                ?.includes(value)

        );


        setFilteredMembers(filtered);

    };


    // ===============================
    // VIEW MEMBER DETAILS
    // ===============================

    const handleViewMember = (member) => {

        alert(

            `Member Details

Name: ${member.name}

Email: ${member.email}

Phone: ${member.phone || "Not Available"}

Status: ${member.membershipStatus || "Not Available"}

Address: ${member.address || "Not Available"}`

        );

    };


    // ===============================
    // LOADING
    // ===============================

    if (loading) {

        return (

            <div className="assigned-loading">

                Loading assigned members...

            </div>

        );

    }


    return (

        <section className="assigned-members-page">


            {/* ================= HEADER ================= */}

            <div className="assigned-members-header">


                <div>

                    <p className="assigned-breadcrumb">

                        Trainer / Assigned Members

                    </p>


                    <h1>

                        Assigned Members

                    </h1>


                    <p>

                        Manage and track your assigned members.

                    </p>

                </div>


                <button

                    className="assigned-refresh-button"

                    onClick={loadMembers}

                >

                    ↻ Refresh

                </button>

            </div>


            {/* ================= ERROR ================= */}

            {

                error && (

                    <div className="assigned-error">

                        {error}

                    </div>

                )

            }


            {/* ================= SEARCH ================= */}

            <div className="assigned-search-container">

                <input

                    type="text"

                    placeholder="Search member by name, email or phone..."

                    value={search}

                    onChange={handleSearch}

                />


                <span>

                    Total: {filteredMembers.length}

                </span>

            </div>


            {/* ================= MEMBER LIST ================= */}

            {

                filteredMembers.length === 0

                    ? (

                        <div className="assigned-empty">

                            No assigned members found.

                        </div>

                    )

                    : (

                        <div className="assigned-members-grid">


                            {

                                filteredMembers.map((member) => (

                                    <div

                                        className="assigned-member-card"

                                        key={member.id}

                                    >


                                        {/* MEMBER HEADER */}

                                        <div className="assigned-member-top">


                                            <div className="assigned-member-avatar">

                                                {

                                                    member.name

                                                        ?.charAt(0)

                                                        ?.toUpperCase()

                                                        || "M"

                                                }

                                            </div>


                                            <div>

                                                <h2>

                                                    {member.name}

                                                </h2>


                                                <span>

                                                    Member

                                                </span>

                                            </div>


                                        </div>


                                        {/* MEMBER DETAILS */}

                                        <div className="assigned-member-details">


                                            <div>

                                                <span>

                                                    Email

                                                </span>

                                                <p>

                                                    {member.email}

                                                </p>

                                            </div>


                                            <div>

                                                <span>

                                                    Phone

                                                </span>

                                                <p>

                                                    {member.phone || "Not Available"}

                                                </p>

                                            </div>


                                            <div>

                                                <span>

                                                    Membership Status

                                                </span>

                                                <p

                                                    className={

                                                        member.membershipStatus === "ACTIVE"

                                                            ? "assigned-status active"

                                                            : "assigned-status"

                                                    }

                                                >

                                                    {

                                                        member.membershipStatus

                                                            || "ASSIGNED"

                                                    }

                                                </p>

                                            </div>


                                        </div>


                                        {/* ACTIONS */}

                                        <div className="assigned-member-actions">


                                            <button

                                                className="assigned-view-button"

                                                onClick={() =>
                                                    handleViewMember(member)
                                                }

                                            >

                                                View Details

                                            </button>

                                            <Link className="assigned-plan-button" to={`/trainer/workout-plan?memberId=${member.id}`}>
                                                Workout
                                            </Link>

                                            <Link className="assigned-plan-button" to={`/trainer/diet-plan?memberId=${member.id}`}>
                                                Diet
                                            </Link>


                                        </div>


                                    </div>

                                ))

                            }


                        </div>

                    )

            }


        </section>

    );

};


export default AssignedMembers;