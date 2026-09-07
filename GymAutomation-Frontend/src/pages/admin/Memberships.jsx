import { useEffect, useState } from "react";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    X,
    RefreshCw,
    CreditCard
} from "lucide-react";

import api from "../../services/api";
import "./Memberships.css";


const Memberships = () => {

    // =====================================
    // STATES
    // =====================================

    const [memberships, setMemberships] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [modalType, setModalType] = useState("");

    const [selectedMembership, setSelectedMembership] = useState(null);

    const [submitting, setSubmitting] = useState(false);


    // =====================================
    // INITIAL FORM
    // =====================================

    const initialForm = {
        name: "",
        price: "",
        durationMonths: "",
        description: ""
    };

    const [form, setForm] = useState(initialForm);


    // =====================================
    // LOAD MEMBERSHIPS
    // =====================================

    const loadMemberships = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "/api/memberships"
            );

            console.log(
                "Membership API Response:",
                response.data
            );


            // Backend returns direct array

            if (Array.isArray(response.data)) {

                setMemberships(response.data);

            }

            // Backend returns Page object

            else if (Array.isArray(response.data?.content)) {

                setMemberships(response.data.content);

            }

            // Backend returns { data: [] }

            else if (Array.isArray(response.data?.data)) {

                setMemberships(response.data.data);

            }

            else {

                setMemberships([]);

            }

        } catch (error) {

            console.error(
                "Membership Load Error:",
                error
            );

            setError(

                error.response?.data?.message ||

                "Unable to load memberships."

            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // LOAD DATA ON PAGE OPEN
    // =====================================

    useEffect(() => {

        loadMemberships();

    }, []);


    // =====================================
    // CREATE MODAL
    // =====================================

    const openCreateModal = () => {

        setModalType("CREATE");

        setSelectedMembership(null);

        setForm(initialForm);

        setShowModal(true);

    };


    // =====================================
    // VIEW MODAL
    // =====================================

    const openViewModal = (membership) => {

        setModalType("VIEW");

        setSelectedMembership(membership);

        setShowModal(true);

    };


    // =====================================
    // EDIT MODAL
    // =====================================

    const openEditModal = (membership) => {

        setModalType("EDIT");

        setSelectedMembership(membership);

        setForm({

            name: membership.name || "",

            price: membership.price || "",

            durationMonths:
                membership.durationMonths || "",

            description:
                membership.description || ""

        });

        setShowModal(true);

    };


    // =====================================
    // CLOSE MODAL
    // =====================================

    const closeModal = () => {

        setShowModal(false);

        setModalType("");

        setSelectedMembership(null);

        setForm(initialForm);

    };


    // =====================================
    // HANDLE INPUT CHANGE
    // =====================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previousForm) => ({

            ...previousForm,

            [name]: value

        }));

    };


    // =====================================
    // CREATE MEMBERSHIP
    // =====================================

    const createMembership = async () => {

        const membershipData = {

            name: form.name,

            price: Number(form.price),

            durationMonths:
                Number(form.durationMonths),

            description: form.description

        };


        await api.post(

            "/api/memberships",

            membershipData

        );

    };


    // =====================================
    // UPDATE MEMBERSHIP
    // =====================================

    const updateMembership = async () => {

        const membershipId =
            selectedMembership?.id;


        if (!membershipId) {

            alert("Membership ID not found.");

            return;

        }


        const membershipData = {

            name: form.name,

            price: Number(form.price),

            durationMonths:
                Number(form.durationMonths),

            description: form.description

        };


        await api.put(

            `/api/memberships/${membershipId}`,

            membershipData

        );

    };


    // =====================================
    // FORM SUBMIT
    // =====================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        try {

            setSubmitting(true);


            if (modalType === "CREATE") {

                await createMembership();

            }


            if (modalType === "EDIT") {

                await updateMembership();

            }


            closeModal();


            await loadMemberships();


        } catch (error) {

            console.error(
                "Save Membership Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Unable to save membership."

            );

        } finally {

            setSubmitting(false);

        }

    };


    // =====================================
    // DELETE MEMBERSHIP
    // =====================================

    const handleDelete = async (membership) => {

        const membershipId =
            membership?.id;


        if (!membershipId) {

            alert("Membership ID not found.");

            return;

        }


        const confirmDelete = window.confirm(

            `Are you sure you want to delete ${membership.name}?`

        );


        if (!confirmDelete) {

            return;

        }


        try {

            await api.delete(

                `/api/memberships/${membershipId}`

            );


            await loadMemberships();


        } catch (error) {

            console.error(
                "Delete Membership Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Unable to delete membership."

            );

        }

    };


    // =====================================
    // SEARCH MEMBERSHIPS
    // =====================================

    const filteredMemberships = memberships.filter(

        (membership) => {

            if (!search.trim()) {

                return true;

            }


            const searchText =
                search.toLowerCase();


            return (

                String(membership.name || "")

                    .toLowerCase()

                    .includes(searchText)


                ||


                String(membership.description || "")

                    .toLowerCase()

                    .includes(searchText)

            );

        }

    );


    // =====================================
    // UI
    // =====================================

    return (

        <section className="memberships-page">


            {/* HEADER */}

            <div className="memberships-header">


                <div>

                    <p className="page-breadcrumb">

                        Admin / Memberships

                    </p>


                    <h1>

                        Membership Management

                    </h1>


                    <p className="page-description">

                        Create and manage gym membership plans.

                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={openCreateModal}
                >

                    <Plus size={18} />

                    Add Membership

                </button>


            </div>


            {/* TOOLBAR */}

            <div className="memberships-toolbar">


                <div className="search-box">

                    <Search size={19} />

                    <input

                        type="text"

                        placeholder="Search membership..."

                        value={search}

                        onChange={(event) =>
                            setSearch(event.target.value)
                        }

                    />

                </div>


                <button
                    className="refresh-button"
                    onClick={loadMemberships}
                >

                    <RefreshCw size={17} />

                    Refresh

                </button>


            </div>


            {/* ERROR */}

            {error && (

                <div className="page-error">

                    {error}

                </div>

            )}


            {/* MEMBERSHIP TABLE */}

            <div className="memberships-table-container">


                {loading ? (

                    <div className="page-loading">

                        Loading memberships...

                    </div>

                ) : (

                    <table className="memberships-table">


                        <thead>

                            <tr>

                                <th>Plan Name</th>

                                <th>Price</th>

                                <th>Duration</th>

                                <th>Description</th>

                                <th>Actions</th>

                            </tr>

                        </thead>


                        <tbody>


                            {filteredMemberships.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="empty-table"
                                    >

                                        <CreditCard size={40} />

                                        <p>

                                            No memberships found

                                        </p>

                                    </td>

                                </tr>

                            ) : (

                                filteredMemberships.map(

                                    (membership, index) => (

                                        <tr
                                            key={
                                                membership.id || index
                                            }
                                        >


                                            {/* PLAN NAME */}

                                            <td>

                                                <div className="membership-name">

                                                    <div className="membership-icon">

                                                        <CreditCard
                                                            size={20}
                                                        />

                                                    </div>

                                                    <strong>

                                                        {
                                                            membership.name
                                                        }

                                                    </strong>

                                                </div>

                                            </td>


                                            {/* PRICE */}

                                            <td>

                                                ₹ {membership.price}

                                            </td>


                                            {/* DURATION */}

                                            <td>

                                                {
                                                    membership.durationMonths
                                                } Months

                                            </td>


                                            {/* DESCRIPTION */}

                                            <td
                                                className="description-cell"
                                            >

                                                {
                                                    membership.description ||
                                                    "-"
                                                }

                                            </td>


                                            {/* ACTIONS */}

                                            <td>


                                                <div className="table-actions">


                                                    {/* VIEW */}

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            openViewModal(
                                                                membership
                                                            )
                                                        }
                                                    >

                                                        <Eye size={17} />

                                                    </button>


                                                    {/* EDIT */}

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            openEditModal(
                                                                membership
                                                            )
                                                        }
                                                    >

                                                        <Edit size={17} />

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                membership
                                                            )
                                                        }
                                                    >

                                                        <Trash2 size={17} />

                                                    </button>


                                                </div>


                                            </td>


                                        </tr>

                                    )

                                )

                            )}


                        </tbody>


                    </table>

                )}

            </div>


            {/* =====================================
                MODAL
            ====================================== */}

            {showModal && (

                <div className="modal-overlay">


                    <div className="membership-modal">


                        {/* MODAL HEADER */}

                        <div className="modal-header">


                            <div>

                                <p>

                                    MEMBERSHIP MANAGEMENT

                                </p>


                                <h2>

                                    {modalType === "CREATE"

                                        ? "Add Membership"

                                        : modalType === "EDIT"

                                            ? "Update Membership"

                                            : "Membership Details"

                                    }

                                </h2>

                            </div>


                            <button
                                className="modal-close"
                                onClick={closeModal}
                            >

                                <X size={22} />

                            </button>


                        </div>


                        {/* =================================
                            VIEW MEMBERSHIP
                        ================================= */}

                        {modalType === "VIEW" ? (

                            <div className="membership-details">


                                <div className="detail-membership-icon">

                                    <CreditCard size={35} />

                                </div>


                                <h2>

                                    {selectedMembership?.name}

                                </h2>


                                <div className="details-grid">


                                    <div>

                                        <label>

                                            Price

                                        </label>

                                        <p>

                                            ₹ {
                                                selectedMembership?.price
                                            }

                                        </p>

                                    </div>


                                    <div>

                                        <label>

                                            Duration

                                        </label>

                                        <p>

                                            {
                                                selectedMembership
                                                    ?.durationMonths
                                            } Months

                                        </p>

                                    </div>


                                    <div className="full-width">

                                        <label>

                                            Description

                                        </label>

                                        <p>

                                            {
                                                selectedMembership
                                                    ?.description ||
                                                "No description available"
                                            }

                                        </p>

                                    </div>


                                </div>


                                <div className="modal-actions">

                                    <button
                                        className="cancel-button"
                                        onClick={closeModal}
                                    >

                                        Close

                                    </button>

                                </div>


                            </div>

                        ) : (

                            /* =================================
                                CREATE / UPDATE FORM
                            ================================= */

                            <form onSubmit={handleSubmit}>


                                <div className="form-grid">


                                    {/* NAME */}

                                    <div className="form-group">

                                        <label>

                                            Membership Name

                                        </label>

                                        <input

                                            type="text"

                                            name="name"

                                            placeholder="Example: Gold Plan"

                                            value={form.name}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>


                                    {/* PRICE */}

                                    <div className="form-group">

                                        <label>

                                            Price

                                        </label>

                                        <input

                                            type="number"

                                            name="price"

                                            placeholder="Example: 2000"

                                            value={form.price}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>


                                    {/* DURATION */}

                                    <div className="form-group">

                                        <label>

                                            Duration (Months)

                                        </label>

                                        <input

                                            type="number"

                                            min="1"

                                            name="durationMonths"

                                            placeholder="Example: 3"

                                            value={form.durationMonths}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>


                                </div>


                                {/* DESCRIPTION */}

                                <div className="form-group">

                                    <label>

                                        Description

                                    </label>

                                    <textarea

                                        name="description"

                                        placeholder="Enter membership description..."

                                        rows="4"

                                        value={form.description}

                                        onChange={handleChange}

                                    />

                                </div>


                                {/* BUTTONS */}

                                <div className="modal-actions">


                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={closeModal}
                                    >

                                        Cancel

                                    </button>


                                    <button
                                        type="submit"
                                        className="primary-button"
                                        disabled={submitting}
                                    >

                                        {submitting

                                            ? "Saving..."

                                            : modalType === "CREATE"

                                                ? "Create Membership"

                                                : "Update Membership"

                                        }

                                    </button>


                                </div>


                            </form>

                        )}


                    </div>


                </div>

            )}


        </section>

    );

};


export default Memberships;