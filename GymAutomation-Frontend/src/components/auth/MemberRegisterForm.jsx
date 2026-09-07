const MemberRegisterForm = ({ formData, handleChange }) => {

    return (

        <>

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
            />


            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
            />


            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
            />


            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
            />


            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
            />


            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
            >

                <option value="">
                    Select Gender
                </option>

                <option value="MALE">
                    Male
                </option>

                <option value="FEMALE">
                    Female
                </option>

                <option value="OTHER">
                    Other
                </option>

            </select>

        </>

    );

};

export default MemberRegisterForm;