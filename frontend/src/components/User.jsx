import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth";

const User = () => {
    const { token, users, deleteUser, getAllUser, editUser } = useContext(AuthContext);
    const [editUserId, setEditUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({ us_name: "", us_email: "", us_password: "", us_phone_number: "", us_address: "" });

    useEffect(() => {
        if (token) {
            getAllUser();
        }
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditUser = (user) => {
        setEditUserId(user.us_id);
        setEditedUser({ 
            us_name: user.us_name, 
            us_email: user.us_email, 
            us_password: user.us_password, 
            us_phone_number: user.us_phone_number, 
            us_address: user.us_address 
        });
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            alert("User deleted successfully!");
        } catch (error) {
            alert(`Failed to delete user: ${error.message}`);
        }
    };

    const saveEditedUser = async () => {
        try {
            await editUser(editedUser, editUserId);
            setEditUserId(null);
            alert("User edited successfully!");
        } catch (error) {
            alert(`Failed to edit user: ${error.message}`);
        }
    };

    const cancelEdit = () => {
        setEditUserId(null);
        setEditedUser({ us_name: "", us_email: "", us_password: "", us_phone_number: "", us_address: "" });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 mt-4">User</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Password</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <React.Fragment key={user.us_id}>
                            <tr className="border px-4 py-2 text-center">
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">{user.us_name}</td>
                                <td className="border px-4 py-2 text-center">{user.us_email}</td>
                                <td className="border px-4 py-2 text-center">{user.us_password}</td>
                                <td className="border px-4 py-2 text-center">{user.us_phone_number}</td>
                                <td className="border px-4 py-2 text-center">{user.us_address}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.us_id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>

                            {editUserId === user.us_id && (
                                <tr>
                                    <td className="border px-4 py-2 " colSpan="7"> 
                                        <p>Edit form for User ID: {user.us_id}</p>
                                        <div className="space-x-2">
                                            <input
                                                type="text"
                                                name="us_name"
                                                value={editedUser.us_name}
                                                onChange={handleInputChange}
                                                className="border px-4 py-2 mr-2"
                                            />
                                            <input
                                                type="text"
                                                name="us_email"
                                                value={editedUser.us_email}
                                                onChange={handleInputChange}
                                                className="border px-4 py-2 mr-2"
                                            />
                                            <input
                                                type="text"
                                                name="us_password"
                                                value={editedUser.us_password}
                                                onChange={handleInputChange}
                                                className="border px-4 py-2 mr-2"
                                            />
                                            <input
                                                type="text"
                                                name="us_phone_number"
                                                value={editedUser.us_phone_number}
                                                onChange={handleInputChange}
                                                className="border px-4 py-2 mr-2"
                                            />
                                            <input
                                                type="text"
                                                name="us_address"
                                                value={editedUser.us_address}
                                                onChange={handleInputChange}
                                                className="border px-4 py-2 mr-2"
                                            />
                                            <button
                                                onClick={saveEditedUser}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
