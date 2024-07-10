import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(email, password);
    };


    return (
        <div>
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="p-2 rounded bg-gray-700 focus:outline-none"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="p-2 rounded bg-gray-700 focus:outline-none"
                    />
                    <button type="submit" className="p-2 bg-blue-500 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
        
        </div>
    );
};

export default Login;
