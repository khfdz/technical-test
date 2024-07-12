import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";

const Register = ({ onToggle }) => {
    const { registerUser } = useContext(AuthContext);
    const [newUser, setNewUser] = useState({
        us_name: "",
        us_email: "",
        us_password: "",
        us_phone_number: "",
        us_address: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (!registerUser) {
                throw new Error("Register function is not available.");
            }
            await registerUser(newUser);
            setNewUser({
                us_name: "",
                us_email: "",
                us_password: "",
                us_phone_number: "",
                us_address: "",
            });
            alert("User registered successfully!");
        } catch (error) {
            alert(`Failed to register user: ${error.message}`);
        }
    };

    return (
        <div>
            <p className="text-2xl font-bold mb-4">Register</p>
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="us_name"
                    value={newUser.us_name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="p-2 rounded bg-gray-700 focus:outline-none"
                    required
                />
                <input
                    type="email"
                    name="us_email"
                    value={newUser.us_email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="p-2 rounded bg-gray-700 focus:outline-none"   
                    required
                />
                <input
                    type="password"
                    name="us_password"
                    value={newUser.us_password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="p-2 rounded bg-gray-700 focus:outline-none"
                    required
                />
                <input
                    type="text"
                    name="us_phone_number"
                    value={newUser.us_phone_number} 
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="p-2 rounded bg-gray-700 focus:outline-none"
                    required
                />
                <input
                    type="text"
                    name="us_address"
                    value={newUser.us_address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="p-2 rounded bg-gray-700 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                >
                    Register
                </button>
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                    onClick={onToggle} // Mengubah komponen saat tombol diklik
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Register;
