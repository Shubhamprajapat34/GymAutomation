import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";
import "./PlanManager.css";

const PlanManager = ({ type }) => {

    const [searchParams] = useSearchParams();

    const [members, setMembers] = useState([]);
    const [plans, setPlans] = useState([]);

    const [selectedMemberId, setSelectedMemberId] =
        useState(searchParams.get("memberId") || "");

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const label =
        type === "workout"
            ? "Workout"
            : "Diet";


    const endpoint =
        `/api/trainer/${type}-plans`;


    // ================================
    // LOAD MEMBERS + PLANS
    // ================================

    const loadData = useCallback(async () => {

        try {

            setLoading(true);
            setError("");


            const [membersResponse, plansResponse] =
                await Promise.all([

                    api.get("/api/trainer/members"),

                    api.get(endpoint)

                ]);


            setMembers(

                Array.isArray(membersResponse.data)

                    ? membersResponse.data

                    : []

            );


            setPlans(

                Array.isArray(plansResponse.data)

                    ? plansResponse.data

                    : []

            );


        } catch (requestError) {

            console.error(requestError);

            setError(

                requestError.response?.data?.message ||

                `Unable to load ${label.toLowerCase()} plans.`

            );

        } finally {

            setLoading(false);

        }

    }, [endpoint, label]);


    useEffect(() => {

        loadData();

    }, [loadData]);


    // ================================
    // RESET FORM
    // ================================

    const resetForm = () => {

        setSelectedMemberId(

            searchParams.get("memberId") || ""

        );

        setTitle("");

        setDetails("");

        setEditingId(null);

    };


    // ================================
    // CREATE / UPDATE PLAN
    // ================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        try {

            setError("");


            const payload = {

                memberId: Number(selectedMemberId),

                title,

                details

            };


            // UPDATE

            if (editingId) {

                await api.put(

                    `${endpoint}/${editingId}`,

                    payload

                );

            }

            // CREATE

            else {

                await api.post(

                    endpoint,

                    payload

                );

            }


            resetForm();

            await loadData();


        } catch (requestError) {

            console.error(requestError);


            setError(

                requestError.response?.data?.message ||

                `Unable to save ${label.toLowerCase()} plan.`

            );

        }

    };


    // ================================
    // EDIT PLAN
    // ================================

    const editPlan = (plan) => {

        setEditingId(plan.id);


        setSelectedMemberId(

            String(

                plan.member?.id ||

                plan.memberId ||

                ""

            )

        );


        setTitle(plan.title || "");

        setDetails(plan.details || "");

    };


    // ================================
    // DELETE PLAN
    // ================================

    const deletePlan = async (id) => {

        const confirmDelete = window.confirm(

            `Delete this ${label.toLowerCase()} plan?`

        );


        if (!confirmDelete) return;


        try {

            await api.delete(

                `${endpoint}/${id}`

            );


            if (editingId === id) {

                resetForm();

            }


            await loadData();


        } catch (requestError) {

            setError(

                requestError.response?.data?.message ||

                `Unable to delete ${label.toLowerCase()} plan.`

            );

        }

    };


    // ================================
    // MEMBER NAME
    // ================================

    const memberName = (member) => {

        return (

            member?.name ||

            member?.user?.name ||

            "Member"

        );

    };


    // ================================
    // LOADING
    // ================================

    if (loading) {

        return (

            <div className="plan-manager-loading">

                Loading {label.toLowerCase()} plans...

            </div>

        );

    }


    return (

        <section className="plan-manager">


            {/* ================= HEADER ================= */}

            <div className="plan-manager-header">

                <div>

                    <p className="plan-manager-breadcrumb">

                        Trainer / {label} Plans

                    </p>


                    <h1>

                        {label} Plans

                    </h1>


                    <p>

                        Create and maintain plans for your assigned members.

                    </p>

                </div>


                <button

                    className="plan-refresh-button"

                    onClick={loadData}

                >

                    ↻ Refresh

                </button>

            </div>


            {/* ================= ERROR ================= */}

            {

                error && (

                    <div className="plan-manager-error">

                        {error}

                    </div>

                )

            }


            {/* ================= FORM ================= */}

            <form

                className="plan-form"

                onSubmit={handleSubmit}

            >


                <div className="plan-form-heading">

                    <h2>

                        {

                            editingId

                                ? `Update ${label} Plan`

                                : `Create ${label} Plan`

                        }

                    </h2>


                    {

                        editingId && (

                            <button

                                type="button"

                                className="plan-cancel-button"

                                onClick={resetForm}

                            >

                                Cancel

                            </button>

                        )

                    }

                </div>


                {/* MEMBER */}

                <label>

                    Member


                    <select

                        value={selectedMemberId}

                        onChange={(event) =>

                            setSelectedMemberId(

                                event.target.value

                            )

                        }

                        required

                    >

                        <option value="">

                            Select an assigned member

                        </option>


                        {

                            members.map((member) => (

                                <option

                                    key={member.id}

                                    value={member.id}

                                >

                                    {memberName(member)}

                                </option>

                            ))

                        }

                    </select>

                </label>


                {/* TITLE */}

                <label>

                    Plan Title


                    <input

                        value={title}

                        onChange={(event) =>

                            setTitle(event.target.value)

                        }

                        placeholder={`Example: ${label} Plan - Week 1`}

                        required

                    />

                </label>


                {/* DETAILS */}

                <label>

                    Plan Details


                    <textarea

                        value={details}

                        onChange={(event) =>

                            setDetails(event.target.value)

                        }

                        placeholder="Add exercises, meals, sets, timing, or other instructions"

                        rows="5"

                        required

                    />

                </label>


                <button

                    className="plan-submit-button"

                    type="submit"

                >

                    {

                        editingId

                            ? "Update Plan"

                            : "Save Plan"

                    }

                </button>


            </form>


            {/* ================= PLAN LIST ================= */}

            <div className="plan-list">


                <div className="plan-list-header">

                    <h2>

                        Saved {label} Plans

                    </h2>


                    <span>

                        {plans.length}

                        {" "}

                        plan

                        {plans.length === 1 ? "" : "s"}

                    </span>

                </div>


                {

                    plans.length === 0

                        ? (

                            <p className="plan-empty">

                                No {label.toLowerCase()} plans created yet.

                            </p>

                        )

                        : (

                            plans.map((plan) => (

                                <article

                                    className="plan-item"

                                    key={plan.id}

                                >

                                    <div>

                                        <span className="plan-member">

                                            {

                                                memberName(

                                                    plan.member

                                                )

                                            }

                                        </span>


                                        <h3>

                                            {plan.title}

                                        </h3>


                                        <p>

                                            {plan.details}

                                        </p>

                                    </div>


                                    <div className="plan-actions">


                                        <button

                                            type="button"

                                            onClick={() =>

                                                editPlan(plan)

                                            }

                                        >

                                            Edit

                                        </button>


                                        <button

                                            type="button"

                                            className="danger"

                                            onClick={() =>

                                                deletePlan(plan.id)

                                            }

                                        >

                                            Delete

                                        </button>


                                    </div>

                                </article>

                            ))

                        )

                }


            </div>


        </section>

    );

};


export default PlanManager;