import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userSingle, setUserSingle] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedUserId = sessionStorage.getItem("userId");
        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
        }
    }, []);

    const getAllUser = async () => {
        try {
            let response = await fetch("http://localhost:5151/api/user", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data User: ", data);
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

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
            alert("Anda berhasil login"); 
            console.log("Data Login", data);
        } catch (error) {
            console.error("Failed to login:", error);
            alert("Email atau password salah"); 
        }
    };

    const logoutUser = () => {
        setToken(null);
        setUserId(null); 
        setUserSingle(null); 
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
    };

    const editUser = async (userDetails, id) => {
        try {
            const response = await fetch(`http://localhost:5151/api/user/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(userDetails),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUsers((prevUsers) => prevUsers.map((user) => (user.us_id === id ? data : user)));
            getAllUser();
            console.log("Data Edit: ", data);
        } catch (error) {
            console.error("Failed to edit user:", error);
        }
    };







    const registerUser = async (userDetails) => {
        try {
            const response = await fetch("http://localhost:5151/api/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
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
            setUserSingle(data.user);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5151/api/user/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data Delete: ", data);

            // Update users state after deletion
            setUsers(users.filter(user => user.us_id !== id));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };
    
    return (
        <AuthContext.Provider value={{ token, userId, users, setUsers, loginUser, logoutUser, registerUser, editUser, getAllUser, getSingleUser, userSingle, deleteUser }}>
            {children}
        </AuthContext.Provider>
    );
};
