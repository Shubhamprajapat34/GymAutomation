import { useEffect, useState } from "react";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    X,
    Users,
    RefreshCw
} from "lucide-react";

import api from "../../services/api";
import "./Trainers.css";


const Trainers = () => {

    // ==========================================
    // STATES
    // ==========================================

    const [trainers, setTrainers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [modalType, setModalType] = useState("");

    const [selectedTrainer, setSelectedTrainer] = useState(null);

    const [submitting, setSubmitting] = useState(false);


    // ==========================================
    // INITIAL FORM
    // ==========================================

    const initialForm = {
        name: "",
        email: "",
        password: "",
        phone: "",
        specialization: "",
        experienceYears: "",
        bio: "",
        role: "TRAINER"
    };


    const [form, setForm] = useState(initialForm);


    // ==========================================
    // GET ALL TRAINERS
    // ==========================================

    const loadTrainers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/api/admin/trainers"
            );

            console.log(
                "Trainers API Response:",
                response.data
            );


            // If backend directly returns an array

            if (Array.isArray(response.data)) {

                setTrainers(response.data);

            }

            // If backend returns Spring Boot Page

            else if (Array.isArray(response.data?.content)) {

                setTrainers(response.data.content);

            }

            // If backend returns { data: [] }

            else if (Array.isArray(response.data?.data)) {

                setTrainers(response.data.data);

            }

            else {

                setTrainers([]);

            }

        } catch (error) {

            console.error(
                "Trainer Load Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load trainers."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOAD DATA WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        loadTrainers();

    }, []);


    // ==========================================
    // OPEN CREATE MODAL
    // ==========================================

    const openCreateModal = () => {

        setModalType("CREATE");

        setSelectedTrainer(null);

        setForm(initialForm);

        setShowModal(true);

    };


    // ==========================================
    // OPEN VIEW MODAL
    // ==========================================

    const openViewModal = (trainer) => {

        setModalType("VIEW");

        setSelectedTrainer(trainer);

        setShowModal(true);

    };


    // ==========================================
    // OPEN EDIT MODAL
    // ==========================================

    const openEditModal = (trainer) => {

        setModalType("EDIT");

        setSelectedTrainer(trainer);

        setForm({
            name: trainer.name || "",
            email: trainer.email || "",
            password: "",
            phone: trainer.phone || "",
            specialization: trainer.specialization || "",
            experienceYears: trainer.experienceYears || "",
            bio: trainer.bio || "",
            role: "TRAINER"
        });

        setShowModal(true);

    };


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    const closeModal = () => {

        setShowModal(false);

        setModalType("");

        setSelectedTrainer(null);

        setForm(initialForm);

    };


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));

    };


    // ==========================================
    // CREATE TRAINER
    // ==========================================

    const createTrainer = async () => {

        const trainerData = {
            ...form,
            role: "TRAINER",

            experienceYears:
                form.experienceYears === ""
                    ? null
                    : Number(form.experienceYears)
        };


        await api.post(
            "/api/auth/register",
            trainerData
        );

    };


    // ==========================================
    // UPDATE TRAINER
    // ==========================================

    const updateTrainer = async () => {

        const trainerId =
            selectedTrainer?.id ||
            selectedTrainer?.userId;


        if (!trainerId) {

            alert("Trainer ID not found.");

            return;

        }


        const updateData = {

            name: form.name,

            email: form.email,

            phone: form.phone,

            specialization: form.specialization,

            experienceYears:
                form.experienceYears === ""
                    ? null
                    : Number(form.experienceYears),

            bio: form.bio,

            role: "TRAINER"

        };


        await api.put(

            `/api/admin/trainers/${trainerId}`,

            updateData

        );

    };


    // ==========================================
    // HANDLE FORM SUBMIT
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        try {

            setSubmitting(true);


            if (modalType === "CREATE") {

                await createTrainer();

            }


            if (modalType === "EDIT") {

                await updateTrainer();

            }


            // Close popup

            closeModal();


            // Reload trainer data

            await loadTrainers();


        } catch (error) {

            console.error(
                "Save Trainer Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Unable to save trainer."

            );

        } finally {

            setSubmitting(false);

        }

    };


    // ==========================================
    // DELETE TRAINER
    // ==========================================

    const handleDelete = async (trainer) => {

        const trainerId =
            trainer.id ||
            trainer.userId;


        if (!trainerId) {

            alert("Trainer ID not found.");

            return;

        }


        const confirmDelete = window.confirm(

            `Are you sure you want to delete ${trainer.name}?`

        );


        if (!confirmDelete) {

            return;

        }


        try {

            await api.delete(

                `/api/admin/trainers/${trainerId}`

            );


            // Reload trainer list

            await loadTrainers();


        } catch (error) {

            console.error(

                "Delete Trainer Error:",

                error

            );


            alert(

                error.response?.data?.message ||

                "Unable to delete trainer."

            );

        }

    };


    // ==========================================
    // SEARCH TRAINERS
    // ==========================================

    const filteredTrainers = trainers.filter(

        (trainer) => {

            if (!search.trim()) {

                return true;

            }


            const searchText =
                search.toLowerCase();


            return (

                String(trainer.name || "")

                    .toLowerCase()

                    .includes(searchText)


                ||


                String(trainer.email || "")

                    .toLowerCase()

                    .includes(searchText)


                ||


                String(trainer.phone || "")

                    .toLowerCase()

                    .includes(searchText)


                ||


                String(trainer.specialization || "")

                    .toLowerCase()

                    .includes(searchText)

            );

        }

    );


    // ==========================================
    // JSX
    // ==========================================

    return (

        <section className="trainers-page">


            {/* =====================================
                PAGE HEADER
            ====================================== */}

            <div className="trainers-header">


                <div>

                    <p className="page-breadcrumb">

                        Admin / Trainers

                    </p>


                    <h1>

                        Trainers Management

                    </h1>


                    <p className="page-description">

                        Create, view, update and manage
                        gym trainers.

                    </p>

                </div>


                <button

                    className="primary-button"

                    onClick={openCreateModal}

                >

                    <Plus size={18} />

                    Add Trainer

                </button>


            </div>


            {/* =====================================
                TOOLBAR
            ====================================== */}

            <div className="trainers-toolbar">


                <div className="search-box">

                    <Search size={19} />

                    <input

                        type="text"

                        placeholder="Search trainers..."

                        value={search}

                        onChange={(event) =>
                            setSearch(event.target.value)
                        }

                    />

                </div>


                <button

                    className="refresh-button"

                    onClick={loadTrainers}

                >

                    <RefreshCw size={17} />

                    Refresh

                </button>


            </div>


            {/* =====================================
                ERROR
            ====================================== */}

            {error && (

                <div className="page-error">

                    {error}

                </div>

            )}


            {/* =====================================
                TRAINERS TABLE
            ====================================== */}

            <div className="trainers-table-container">


                {loading ? (

                    <div className="page-loading">

                        Loading trainers...

                    </div>

                ) : (

                    <table className="trainers-table">


                        <thead>

                            <tr>

                                <th>Trainer</th>

                                <th>Email</th>

                                <th>Specialization</th>

                                <th>Experience</th>

                                <th>Actions</th>

                            </tr>

                        </thead>


                        <tbody>


                            {filteredTrainers.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="empty-table"

                                    >

                                        <Users size={40} />

                                        <p>

                                            No trainers found

                                        </p>

                                    </td>

                                </tr>

                            ) : (

                                filteredTrainers.map(

                                    (trainer, index) => (

                                        <tr

                                            key={

                                                trainer.id ||

                                                trainer.userId ||

                                                index

                                            }

                                        >


                                            {/* TRAINER NAME */}

                                            <td>

                                                <div className="trainer-info">


                                                    <div className="trainer-avatar">

                                                        {trainer.name

                                                            ?.charAt(0)

                                                            ?.toUpperCase()

                                                        }

                                                    </div>


                                                    <div>

                                                        <strong>

                                                            {trainer.name ||
                                                                "Unknown"}

                                                        </strong>


                                                        <span>

                                                            {trainer.phone ||
                                                                "No Phone"}

                                                        </span>

                                                    </div>


                                                </div>

                                            </td>


                                            {/* EMAIL */}

                                            <td>

                                                {trainer.email ||
                                                    "-"}

                                            </td>


                                            {/* SPECIALIZATION */}

                                            <td>

                                                {trainer.specialization ||
                                                    "-"}

                                            </td>


                                            {/* EXPERIENCE */}

                                            <td>

                                                {trainer.experienceYears !==
                                                    undefined &&

                                                trainer.experienceYears !==
                                                    null

                                                    ?

                                                    `${trainer.experienceYears} Years`

                                                    :

                                                    "-"

                                                }

                                            </td>


                                            {/* ACTIONS */}

                                            <td>


                                                <div className="table-actions">


                                                    {/* VIEW */}

                                                    <button

                                                        className="view-button"

                                                        title="View Trainer"

                                                        onClick={() =>

                                                            openViewModal(

                                                                trainer

                                                            )

                                                        }

                                                    >

                                                        <Eye size={17} />

                                                    </button>


                                                    {/* EDIT */}

                                                    <button

                                                        className="edit-button"

                                                        title="Edit Trainer"

                                                        onClick={() =>

                                                            openEditModal(

                                                                trainer

                                                            )

                                                        }

                                                    >

                                                        <Edit size={17} />

                                                    </button>


                                                    {/* DELETE */}

                                                    <button

                                                        className="delete-button"

                                                        title="Delete Trainer"

                                                        onClick={() =>

                                                            handleDelete(

                                                                trainer

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


                    <div className="trainer-modal">


                        {/* MODAL HEADER */}

                        <div className="modal-header">


                            <div>

                                <p>

                                    TRAINER MANAGEMENT

                                </p>


                                <h2>


                                    {modalType === "CREATE"

                                        ?

                                        "Add New Trainer"


                                        :

                                        modalType === "EDIT"

                                            ?

                                            "Update Trainer"

                                            :

                                            "Trainer Details"

                                    }


                                </h2>

                            </div>


                            <button

                                type="button"

                                className="modal-close"

                                onClick={closeModal}

                            >

                                <X size={22} />

                            </button>


                        </div>


                        {/* =====================================
                            VIEW TRAINER
                        ====================================== */}

                        {modalType === "VIEW" ? (


                            <div className="trainer-details">


                                <div className="detail-avatar">

                                    {selectedTrainer?.name

                                        ?.charAt(0)

                                        ?.toUpperCase()

                                    }

                                </div>


                                <h2>

                                    {selectedTrainer?.name}

                                </h2>


                                <div className="details-grid">


                                    <div>

                                        <label>

                                            Email

                                        </label>


                                        <p>

                                            {selectedTrainer?.email ||
                                                "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <label>

                                            Phone

                                        </label>


                                        <p>

                                            {selectedTrainer?.phone ||
                                                "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <label>

                                            Specialization

                                        </label>


                                        <p>

                                            {selectedTrainer?.specialization ||
                                                "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <label>

                                            Experience

                                        </label>


                                        <p>

                                            {selectedTrainer
                                                ?.experienceYears !==
                                                    undefined

                                                ?

                                                `${selectedTrainer.experienceYears} Years`

                                                :

                                                "-"

                                            }

                                        </p>

                                    </div>


                                    <div className="full-width">

                                        <label>

                                            Bio

                                        </label>


                                        <p>

                                            {selectedTrainer?.bio ||
                                                "No bio available"}

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


                            /* =====================================
                                CREATE / EDIT FORM
                            ====================================== */

                            <form onSubmit={handleSubmit}>


                                <div className="form-grid">


                                    {/* NAME */}

                                    <div className="form-group">

                                        <label>

                                            Full Name

                                        </label>


                                        <input

                                            type="text"

                                            name="name"

                                            placeholder="Enter full name"

                                            value={form.name}

                                            onChange={handleChange}

                                            required

                                        />

                                    </div>


                                    {/* EMAIL */}

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

                                            required

                                        />

                                    </div>


                                    {/* PASSWORD ONLY CREATE */}

                                    {modalType === "CREATE" && (

                                        <div className="form-group">

                                            <label>

                                                Password

                                            </label>


                                            <input

                                                type="password"

                                                name="password"

                                                placeholder="Enter password"

                                                value={form.password}

                                                onChange={handleChange}

                                                required

                                            />

                                        </div>

                                    )}


                                    {/* PHONE */}

                                    <div className="form-group">

                                        <label>

                                            Phone

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


                                    {/* SPECIALIZATION */}

                                    <div className="form-group">

                                        <label>

                                            Specialization

                                        </label>


                                        <input

                                            type="text"

                                            name="specialization"

                                            placeholder="Example: Weight Training"

                                            value={form.specialization}

                                            onChange={handleChange}

                                        />

                                    </div>


                                    {/* EXPERIENCE */}

                                    <div className="form-group">

                                        <label>

                                            Experience Years

                                        </label>


                                        <input

                                            type="number"

                                            min="0"

                                            name="experienceYears"

                                            placeholder="Example: 5"

                                            value={form.experienceYears}

                                            onChange={handleChange}

                                        />

                                    </div>


                                </div>


                                {/* BIO */}

                                <div className="form-group bio-group">

                                    <label>

                                        Bio

                                    </label>


                                    <textarea

                                        name="bio"

                                        placeholder="Write trainer bio..."

                                        rows="4"

                                        value={form.bio}

                                        onChange={handleChange}

                                    />

                                </div>


                                {/* ACTION BUTTONS */}

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

                                            ?

                                            "Saving..."


                                            :

                                            modalType === "CREATE"

                                                ?

                                                "Create Trainer"

                                                :

                                                "Update Trainer"

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


export default Trainers;