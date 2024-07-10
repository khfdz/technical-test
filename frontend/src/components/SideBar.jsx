import React from "react";
import Login from "../components/Login";
import Profile from "../components/Profile";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const SideBar = () => {
    const { token } = useContext(AuthContext);

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg">
            {!token && <Login />}
            {token && <Profile />}
        </div>
    );
};

export default SideBar;
