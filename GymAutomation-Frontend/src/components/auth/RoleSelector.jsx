const RoleSelector = ({ selectedRole, setSelectedRole }) => {

    return (

        <div>

            <label>Select Role</label>

            <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
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

        </div>

    );

};

export default RoleSelector;