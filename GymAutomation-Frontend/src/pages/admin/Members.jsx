import { useEffect, useState } from "react";

import {
    Search,
    Plus,
    Edit,
    Trash2,
    X,
    Users,
    RefreshCw,
    Eye
} from "lucide-react";

import api from "../../services/api";

import "./Members.css";


const Members = () => {

    // ==========================================
    // STATE
    // ==========================================

    const [members, setMembers] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [modalType, setModalType] = useState("");

    const [selectedMember, setSelectedMember] = useState(null);

    const [submitting, setSubmitting] = useState(false);


    // ==========================================
    // FORM DATA
    // ==========================================

    const initialForm = {

        name: "",

        email: "",

        password: "",

        phone: "",

        address: "",

        emergencyContact: "",

        role: "MEMBER"

    };


    const [form, setForm] = useState(initialForm);


    // ==========================================
    // READ - GET ALL MEMBERS
    // ==========================================

    const loadMembers = async () => {

        try {

            setLoading(true);

            setError("");


            const response = await api.get(
                "/api/admin/members"
            );


            console.log(
                "Members Response:",
                response.data
            );


            const memberList = Array.isArray(response.data)
                ? response.data
                : response.data.content || [];

            // Member contact data is stored in the related User entity.
            // Flatten it once so the table and modals use one consistent shape.
            setMembers(memberList.map((member) => ({
                ...member,
                name: member.user?.name || "",
                email: member.user?.email || "",
                phone: member.user?.phone || ""
            })));


        } catch (error) {

            console.error(
                "Load Members Error:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Unable to load members."

            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOAD MEMBERS WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        const requestId = window.setTimeout(loadMembers, 0);

        return () => window.clearTimeout(requestId);

    }, []);


    // ==========================================
    // OPEN CREATE MODAL
    // ==========================================

    const openCreateModal = () => {

        setModalType("CREATE");

        setSelectedMember(null);

        setForm(initialForm);

        setShowModal(true);

    };


    // ==========================================
    // OPEN VIEW MODAL
    // ==========================================

    const openViewModal = (member) => {

        setModalType("VIEW");

        setSelectedMember(member);

        setShowModal(true);

    };


    // ==========================================
    // OPEN EDIT MODAL
    // ==========================================

    const openEditModal = (member) => {

        setModalType("EDIT");

        setSelectedMember(member);


        setForm({

            name: member.name || "",

            email: member.email || "",

            password: "",

            phone: member.phone || "",

            address: member.address || "",

            emergencyContact:
                member.emergencyContact || "",

            role: "MEMBER"

        });


        setShowModal(true);

    };


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    const closeModal = () => {

        setShowModal(false);

        setModalType("");

        setSelectedMember(null);

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
    // CREATE MEMBER
    // ==========================================

    const createMember = async () => {

        await api.post(

            "/api/auth/register",

            form

        );

    };


    // ==========================================
    // UPDATE MEMBER
    // ==========================================

    const updateMember = async () => {

        const updateData = {
            address: form.address,
            emergencyContact: form.emergencyContact,
            user: {
                name: form.name,
                email: form.email,
                phone: form.phone
            }
        };


        await api.put(

            `/api/admin/members/${selectedMember.id}`,

            updateData

        );

    };


    // ==========================================
    // HANDLE CREATE / UPDATE
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        try {

            setSubmitting(true);


            if (modalType === "CREATE") {

                await createMember();

            }


            if (modalType === "EDIT") {

                await updateMember();

            }


            closeModal();

            await loadMembers();


        } catch (error) {

            console.error(
                "Save Member Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Unable to save member."

            );

        } finally {

            setSubmitting(false);

        }

    };


    // ==========================================
    // DELETE MEMBER
    // ==========================================

    const handleDelete = async (member) => {

        const confirmed = window.confirm(

            `Are you sure you want to delete ${member.name}?`

        );


        if (!confirmed) {

            return;

        }


        try {

            await api.delete(

                `/api/admin/members/${member.id}`

            );


            await loadMembers();


        } catch (error) {

            console.error(
                "Delete Member Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Unable to delete member."

            );

        }

    };


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredMembers = members.filter(
        (member) => {

            const searchText =
                search.toLowerCase();


            return (

                member.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                member.email
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                member.phone
                    ?.toLowerCase()
                    .includes(searchText)

            );

        }
    );


    // ==========================================
    // JSX
    // ==========================================

    return (

        <section className="members-page">


            {/* ===============================
                HEADER
            ================================ */}

            <div className="members-header">


                <div>


                    <p className="page-breadcrumb">

                        Admin / Members

                    </p>


                    <h1>

                        Members Management

                    </h1>


                    <p className="page-description">

                        Create, view, update and manage
                        gym members.

                    </p>


                </div>


                <button

                    className="primary-button"

                    onClick={openCreateModal}

                >

                    <Plus size={18} />

                    Add Member

                </button>


            </div>



            {/* ===============================
                TOOLBAR
            ================================ */}

            <div className="members-toolbar">


                <div className="search-box">


                    <Search size={19} />


                    <input

                        type="text"

                        placeholder="Search members..."

                        value={search}

                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }

                    />


                </div>



                <button

                    className="refresh-button"

                    onClick={loadMembers}

                    disabled={loading}

                >

                    <RefreshCw size={17} />

                    Refresh

                </button>


            </div>



            {/* ===============================
                ERROR
            ================================ */}

            {

                error && (

                    <div className="page-error">

                        {error}

                    </div>

                )

            }



            {/* ===============================
                MEMBERS TABLE
            ================================ */}

            <div className="members-table-container">


                {

                    loading

                        ?

                        (

                            <div className="page-loading">

                                Loading members...

                            </div>

                        )

                        :

                        (

                            <table className="members-table">


                                <thead>

                                    <tr>

                                        <th>

                                            Member

                                        </th>


                                        <th>

                                            Email

                                        </th>


                                        <th>

                                            Phone

                                        </th>


                                        <th>

                                            Status

                                        </th>


                                        <th>

                                            Actions

                                        </th>

                                    </tr>

                                </thead>


                                <tbody>


                                    {

                                        filteredMembers.length === 0

                                            ?

                                            (

                                                <tr>

                                                    <td
                                                        colSpan="5"
                                                        className="empty-table"
                                                    >

                                                        <Users size={40} />

                                                        <p>

                                                            No members found

                                                        </p>

                                                    </td>

                                                </tr>

                                            )

                                            :

                                            (

                                                filteredMembers.map(

                                                    (member) => (

                                                        <tr
                                                            key={member.id}
                                                        >


                                                            {/* MEMBER */}

                                                            <td>


                                                                <div className="member-info">


                                                                    <div className="member-avatar">

                                                                        {

                                                                            member.name
                                                                                ?.charAt(0)
                                                                                ?.toUpperCase()

                                                                        }

                                                                    </div>


                                                                    <div>


                                                                        <strong>

                                                                            {

                                                                                member.name

                                                                            }

                                                                        </strong>


                                                                        <span>

                                                                            ID: {

                                                                                member.id

                                                                            }

                                                                        </span>


                                                                    </div>


                                                                </div>


                                                            </td>



                                                            {/* EMAIL */}

                                                            <td>

                                                                {

                                                                    member.email

                                                                }

                                                            </td>



                                                            {/* PHONE */}

                                                            <td>

                                                                {

                                                                    member.phone ||

                                                                    "-"

                                                                }

                                                            </td>



                                                            {/* STATUS */}

                                                            <td>


                                                                <span

                                                                    className={

                                                                        `status-badge ${

                                                                            member.membershipStatus ===
                                                                            "ACTIVE"

                                                                                ?

                                                                                "status-active"

                                                                                :

                                                                                "status-inactive"

                                                                        }`

                                                                    }

                                                                >

                                                                    {

                                                                        member.membershipStatus ||

                                                                        "ACTIVE"

                                                                    }

                                                                </span>


                                                            </td>



                                                            {/* ACTIONS */}

                                                            <td>


                                                                <div className="table-actions">


                                                                    {/* VIEW */}

                                                                    <button

                                                                        className="view-button"

                                                                        title="View Member"

                                                                        onClick={() =>
                                                                            openViewModal(member)
                                                                        }

                                                                    >

                                                                        <Eye size={17} />

                                                                    </button>



                                                                    {/* EDIT */}

                                                                    <button

                                                                        className="edit-button"

                                                                        title="Edit Member"

                                                                        onClick={() =>
                                                                            openEditModal(member)
                                                                        }

                                                                    >

                                                                        <Edit size={17} />

                                                                    </button>



                                                                    {/* DELETE */}

                                                                    <button

                                                                        className="delete-button"

                                                                        title="Delete Member"

                                                                        onClick={() =>
                                                                            handleDelete(member)
                                                                        }

                                                                    >

                                                                        <Trash2 size={17} />

                                                                    </button>


                                                                </div>


                                                            </td>


                                                        </tr>

                                                    )

                                                )

                                            )

                                    }


                                </tbody>


                            </table>

                        )

                }


            </div>



            {/* ==================================
                MODAL
            =================================== */}

            {

                showModal && (

                    <div className="modal-overlay">


                        <div className="member-modal">


                            {/* MODAL HEADER */}

                            <div className="modal-header">


                                <div>


                                    <p>

                                        MEMBER MANAGEMENT

                                    </p>


                                    <h2>

                                        {

                                            modalType === "CREATE"

                                                ?

                                                "Add New Member"

                                                :

                                                modalType === "EDIT"

                                                    ?

                                                    "Update Member"

                                                    :

                                                    "Member Details"

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



                            {/* ==================================
                                VIEW MEMBER
                            =================================== */}

                            {

                                modalType === "VIEW"

                                    ?

                                    (

                                        <div className="member-details">


                                            <div className="detail-avatar">

                                                {

                                                    selectedMember?.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()

                                                }

                                            </div>


                                            <h2>

                                                {

                                                    selectedMember?.name

                                                }

                                            </h2>


                                            <div className="details-grid">


                                                <div>

                                                    <label>

                                                        Member ID

                                                    </label>

                                                    <p>

                                                        {

                                                            selectedMember?.id

                                                        }

                                                    </p>

                                                </div>


                                                <div>

                                                    <label>

                                                        Email

                                                    </label>

                                                    <p>

                                                        {

                                                            selectedMember?.email

                                                        }

                                                    </p>

                                                </div>


                                                <div>

                                                    <label>

                                                        Phone

                                                    </label>

                                                    <p>

                                                        {

                                                            selectedMember?.phone ||

                                                            "-"

                                                        }

                                                    </p>

                                                </div>


                                                <div>

                                                    <label>

                                                        Address

                                                    </label>

                                                    <p>

                                                        {

                                                            selectedMember?.address ||

                                                            "-"

                                                        }

                                                    </p>

                                                </div>


                                                <div>

                                                    <label>

                                                        Emergency Contact

                                                    </label>

                                                    <p>

                                                        {

                                                            selectedMember?.emergencyContact ||

                                                            "-"

                                                        }

                                                    </p>

                                                </div>


                                                <div>

                                                    <label>

                                                        Membership Status

                                                    </label>

                                                    <p>

                                                        {

                                                            selectedMember?.membershipStatus ||

                                                            "ACTIVE"

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

                                    )

                                    :

                                    (

                                        /* ==========================
                                           CREATE / EDIT FORM
                                        ========================== */

                                        <form
                                            onSubmit={handleSubmit}
                                        >


                                            <div className="form-grid">


                                                <div className="form-group">

                                                    <label>

                                                        Full Name

                                                    </label>

                                                    <input

                                                        type="text"

                                                        name="name"

                                                        value={form.name}

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

                                                        value={form.email}

                                                        onChange={handleChange}

                                                        required

                                                    />

                                                </div>



                                                {

                                                    modalType === "CREATE"

                                                    &&

                                                    (

                                                        <div className="form-group">

                                                            <label>

                                                                Password

                                                            </label>

                                                            <input

                                                                type="password"

                                                                name="password"

                                                                value={form.password}

                                                                onChange={handleChange}

                                                                required

                                                            />

                                                        </div>

                                                    )

                                                }



                                                <div className="form-group">

                                                    <label>

                                                        Phone

                                                    </label>

                                                    <input

                                                        type="text"

                                                        name="phone"

                                                        value={form.phone}

                                                        onChange={handleChange}

                                                        required

                                                    />

                                                </div>



                                                <div className="form-group">

                                                    <label>

                                                        Address

                                                    </label>

                                                    <input

                                                        type="text"

                                                        name="address"

                                                        value={form.address}

                                                        onChange={handleChange}

                                                    />

                                                </div>



                                                <div className="form-group">

                                                    <label>

                                                        Emergency Contact

                                                    </label>

                                                    <input

                                                        type="text"

                                                        name="emergencyContact"

                                                        value={
                                                            form.emergencyContact
                                                        }

                                                        onChange={handleChange}

                                                    />

                                                </div>


                                            </div>



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

                                                            ?

                                                            "Saving..."

                                                            :

                                                            modalType ===
                                                            "CREATE"

                                                                ?

                                                                "Create Member"

                                                                :

                                                                "Update Member"

                                                    }

                                                </button>


                                            </div>


                                        </form>

                                    )

                            }


                        </div>


                    </div>

                )

            }


        </section>

    );

};


export default Members;
