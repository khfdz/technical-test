import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth";

const Profile = () => {
    const { userId, getSingleUser, userSingle, logoutUser } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (userId && !userSingle) {
            setLoading(true);
            getSingleUser(userId)
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        }
    }, [userId, getSingleUser, userSingle]);

    const handleLogout = () => {
        logoutUser(); 
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-2">
            {userSingle ? (
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-2 text-black">Profile</h1>
                    <div className="border-b border-gray-200 mb-2 pb-4 text-black">
                        <h2 className="text-xl font-semibold">{userSingle.us_name}</h2>
                        <p className="text-gray-600">{userSingle.us_email}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700">Phone Number: {userSingle.us_phone_number}</p>
                        <p className="text-gray-700">Address: {userSingle.us_address}</p>
                        <p className="text-gray-700">Joined at: {new Date(userSingle.us_created_at).toLocaleDateString()}</p>
                    </div>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p className="p-6">User data not found</p>
            )}
        </div>
    );
};

export default Profile;
