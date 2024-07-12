import React, { useContext, useState } from "react";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Register from "../components/Register";
import { AuthContext } from "../context/Auth";

const SideBar = () => {
    const { token } = useContext(AuthContext);
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);

    const toggleComponent = () => {
        setIsRegisterVisible(!isRegisterVisible);
    };

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg">
            {!token && !isRegisterVisible && <Login onToggle={toggleComponent} />}
            {!token && isRegisterVisible && <Register onToggle={toggleComponent} />}
            {token && <Profile />}
        </div>
    );
};

export default SideBar;
