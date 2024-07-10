import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userSingle, setUserSingle] = useState(null); // Menambahkan state untuk single user

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedUserId = sessionStorage.getItem("userId");
        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
        }
    }, []);

    const loginUser = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5151/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ us_email: email, us_password: password }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setToken(data.token);
            setUserId(data.user.us_id); 
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userId", data.user.us_id);
            console.log("Data Login", data);
            console.log("Token: ", data.token); 
            console.log("UserId: ", data.user.us_id); 
        } catch (error) {
            console.error("Failed to login:", error);
        }
    };

    const logoutUser = () => {
        setToken(null);
        setUserId(null); // Pastikan mengatur userId ke null saat logout
        setUserSingle(null); // Reset userSingle saat logout
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
    };

    const editUser = async (userDetails) => {
        try {
            const response = await fetch("http://localhost:5151/api/edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userDetails),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data Edit: ", data);
        } catch (error) {
            console.error("Failed to edit:", error);
        }
    };

    const registerUser = async (userDetails) => {
        try {
            const response = await fetch("http://localhost:5151/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data Register: ", data);
        } catch (error) {
            console.error("Failed to register:", error);
        }
    };  

    const getAllUser = async () => {
        try {
            const response = await fetch("http://localhost:5151/api/users", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data User: ", data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const getSingleUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5151/api/user/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data Single User: ", data);
            setUserSingle(data.user); // Menyimpan single user ke dalam state userSingle
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    };
    
    return (
        <AuthContext.Provider value={{ token, userId, loginUser, logoutUser, registerUser, editUser, getAllUser, getSingleUser, userSingle }}>
            {children}
        </AuthContext.Provider>
    );
};
