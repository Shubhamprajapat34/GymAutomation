import { useEffect, useState } from "react";

import {
    Plus,
    Edit,
    Eye,
    X,
    RefreshCw,
    Building2,
    MapPin,
    Phone,
    Mail,
    Clock
} from "lucide-react";

import api from "../../services/api";

import "./Gym.css";


const Gym = () => {

    // =========================================
    // STATES
    // =========================================

    const [gym, setGym] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [modalType, setModalType] = useState("");

    const [submitting, setSubmitting] = useState(false);


    // =========================================
    // INITIAL FORM
    // =========================================

    const initialForm = {

        name: "",

        address: "",

        phone: "",

        email: "",

        openingTime: "",

        closingTime: "",

        description: ""

    };


    const [form, setForm] = useState(initialForm);


    // =========================================
    // GET GYM INFORMATION
    // =========================================

    const loadGym = async () => {

        try {

            setLoading(true);

            setError("");


            const response = await api.get("/api/gym");


            console.log(
                "Gym Data:",
                response.data
            );


            // If backend returns array
            if (Array.isArray(response.data)) {

                setGym(
                    response.data.length > 0
                        ? response.data[0]
                        : null
                );

            }

            // If backend returns { data: {} }
            else if (response.data?.data) {

                setGym(response.data.data);

            }

            // Normal object response
            else {

                setGym(response.data);

            }

        } catch (error) {

            console.error(
                "Gym Load Error:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Unable to load gym information."

            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // LOAD DATA WHEN PAGE OPENS
    // =========================================

    useEffect(() => {

        loadGym();

    }, []);


    // =========================================
    // HANDLE FORM INPUT
    // =========================================

    const handleChange = (event) => {

        const { name, value } = event.target;


        setForm((previousForm) => ({

            ...previousForm,

            [name]: value

        }));

    };


    // =========================================
    // OPEN CREATE MODAL
    // =========================================

    const openCreateModal = () => {

        setModalType("CREATE");

        setForm(initialForm);

        setShowModal(true);

    };


    // =========================================
    // OPEN VIEW MODAL
    // =========================================

    const openViewModal = () => {

        setModalType("VIEW");

        setShowModal(true);

    };


    // =========================================
    // OPEN EDIT MODAL
    // =========================================

    const openEditModal = () => {

        if (!gym) return;


        setModalType("EDIT");


        setForm({

            name: gym.name || "",

            address: gym.address || "",

            phone: gym.phone || "",

            email: gym.email || "",

            openingTime: gym.openingTime || "",

            closingTime: gym.closingTime || "",

            description: gym.description || ""

        });


        setShowModal(true);

    };


    // =========================================
    // CLOSE MODAL
    // =========================================

    const closeModal = () => {

        setShowModal(false);

        setModalType("");

        setForm(initialForm);

    };


    // =========================================
    // CREATE GYM
    // =========================================

    const createGym = async () => {

        await api.post(

            "/api/gym",

            form

        );

    };


    // =========================================
    // UPDATE GYM
    // =========================================

    const updateGym = async () => {

        if (!gym?.id) {

            alert("Gym ID not found.");

            return;

        }


        await api.put(

            `/api/gym/${gym.id}`,

            form

        );

    };


    // =========================================
    // FORM SUBMIT
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        try {

            setSubmitting(true);


            if (modalType === "CREATE") {

                await createGym();

            }


            if (modalType === "EDIT") {

                await updateGym();

            }


            closeModal();


            // Reload latest database data
            await loadGym();


        } catch (error) {

            console.error(
                "Gym Save Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Unable to save gym information."

            );

        } finally {

            setSubmitting(false);

        }

    };


    return (

        <section className="gym-page">


            {/* ================= HEADER ================= */}

            <div className="gym-header">


                <div>

                    <p className="page-breadcrumb">

                        Admin / Gym

                    </p>


                    <h1>

                        Gym Information

                    </h1>


                    <p className="page-description">

                        Manage your gym details and information.

                    </p>

                </div>


                <div className="gym-header-actions">


                    <button
                        className="refresh-button"
                        onClick={loadGym}
                    >

                        <RefreshCw size={17} />

                        Refresh

                    </button>


                    {!gym ? (

                        <button
                            className="primary-button"
                            onClick={openCreateModal}
                        >

                            <Plus size={18} />

                            Add Gym

                        </button>

                    ) : (

                        <button
                            className="primary-button"
                            onClick={openEditModal}
                        >

                            <Edit size={18} />

                            Edit Gym

                        </button>

                    )}

                </div>

            </div>


            {/* ================= ERROR ================= */}

            {error && (

                <div className="page-error">

                    {error}

                </div>

            )}


            {/* ================= LOADING ================= */}

            {loading ? (

                <div className="gym-loading">

                    Loading gym information...

                </div>

            ) : gym ? (

                /* ================= GYM CARD ================= */

                <div className="gym-card">


                    <div className="gym-card-header">


                        <div className="gym-main-info">


                            <div className="gym-logo">

                                <Building2 size={30} />

                            </div>


                            <div>

                                <p>

                                    GYM INFORMATION

                                </p>


                                <h2>

                                    {gym.name}

                                </h2>

                            </div>

                        </div>


                        <button
                            className="view-gym-button"
                            onClick={openViewModal}
                        >

                            <Eye size={18} />

                            View Details

                        </button>

                    </div>


                    {/* ================= DETAILS ================= */}

                    <div className="gym-details-grid">


                        <div className="gym-detail-item">

                            <div className="detail-icon">

                                <MapPin size={20} />

                            </div>


                            <div>

                                <span>

                                    Address

                                </span>


                                <strong>

                                    {gym.address || "-"}

                                </strong>

                            </div>

                        </div>


                        <div className="gym-detail-item">

                            <div className="detail-icon">

                                <Phone size={20} />

                            </div>


                            <div>

                                <span>

                                    Phone

                                </span>


                                <strong>

                                    {gym.phone || "-"}

                                </strong>

                            </div>

                        </div>


                        <div className="gym-detail-item">

                            <div className="detail-icon">

                                <Mail size={20} />

                            </div>


                            <div>

                                <span>

                                    Email

                                </span>


                                <strong>

                                    {gym.email || "-"}

                                </strong>

                            </div>

                        </div>


                        <div className="gym-detail-item">

                            <div className="detail-icon">

                                <Clock size={20} />

                            </div>


                            <div>

                                <span>

                                    Opening Time

                                </span>


                                <strong>

                                    {gym.openingTime || "-"}

                                </strong>

                            </div>

                        </div>


                        <div className="gym-detail-item">

                            <div className="detail-icon">

                                <Clock size={20} />

                            </div>


                            <div>

                                <span>

                                    Closing Time

                                </span>


                                <strong>

                                    {gym.closingTime || "-"}

                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* ================= DESCRIPTION ================= */}

                    <div className="gym-description">


                        <h3>

                            About Gym

                        </h3>


                        <p>

                            {

                                gym.description ||

                                "No description available."

                            }

                        </p>

                    </div>


                </div>

            ) : (

                /* ================= EMPTY STATE ================= */

                <div className="gym-empty-state">


                    <div className="empty-gym-icon">

                        <Building2 size={45} />

                    </div>


                    <h2>

                        No Gym Information Found

                    </h2>


                    <p>

                        Add your gym information to get started.

                    </p>


                    <button
                        className="primary-button"
                        onClick={openCreateModal}
                    >

                        <Plus size={18} />

                        Add Gym

                    </button>

                </div>

            )}


            {/* ================= MODAL ================= */}

            {showModal && (

                <div className="modal-overlay">


                    <div className="gym-modal">


                        {/* MODAL HEADER */}

                        <div className="modal-header">


                            <div>

                                <p>

                                    GYM MANAGEMENT

                                </p>


                                <h2>

                                    {

                                        modalType === "CREATE"

                                            ? "Add Gym"

                                            : modalType === "EDIT"

                                                ? "Update Gym"

                                                : "Gym Details"

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


                        {/* ================= VIEW ================= */}

                        {modalType === "VIEW" ? (

                            <div className="gym-view-details">


                                <div className="view-gym-icon">

                                    <Building2 size={40} />

                                </div>


                                <h2>

                                    {gym?.name}

                                </h2>


                                <div className="view-details-grid">


                                    <div>

                                        <label>

                                            Address

                                        </label>

                                        <p>

                                            {gym?.address || "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <label>

                                            Phone

                                        </label>

                                        <p>

                                            {gym?.phone || "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <label>

                                            Email

                                        </label>

                                        <p>

                                            {gym?.email || "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <label>

                                            Opening Time

                                        </label>

                                        <p>

                                            {gym?.openingTime || "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <label>

                                            Closing Time

                                        </label>

                                        <p>

                                            {gym?.closingTime || "-"}

                                        </p>

                                    </div>


                                    <div className="full-width">

                                        <label>

                                            Description

                                        </label>

                                        <p>

                                            {

                                                gym?.description ||

                                                "No description available."

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

                            /* ================= CREATE / EDIT FORM ================= */

                            <form onSubmit={handleSubmit}>


                                <div className="gym-form-grid">


                                    <div className="form-group">

                                        <label>

                                            Gym Name

                                        </label>


                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter gym name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>

                                            Phone Number

                                        </label>


                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Enter phone number"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>

                                            Email

                                        </label>


                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email"
                                            value={form.email}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>

                                            Opening Time

                                        </label>


                                        <input
                                            type="time"
                                            name="openingTime"
                                            value={form.openingTime}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>

                                            Closing Time

                                        </label>


                                        <input
                                            type="time"
                                            name="closingTime"
                                            value={form.closingTime}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>


                                {/* ADDRESS */}

                                <div className="form-group">

                                    <label>

                                        Address

                                    </label>


                                    <textarea
                                        name="address"
                                        placeholder="Enter gym address"
                                        rows="3"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="form-group">

                                    <label>

                                        Gym Description

                                    </label>


                                    <textarea
                                        name="description"
                                        placeholder="Write something about your gym..."
                                        rows="4"
                                        value={form.description}
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* ACTIONS */}

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

                                        {

                                            submitting

                                                ? "Saving..."

                                                : modalType === "CREATE"

                                                    ? "Add Gym"

                                                    : "Update Gym"

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


export default Gym;