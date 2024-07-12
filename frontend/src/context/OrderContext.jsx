import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrders();
    }, [token]);

    const getAllOrders = async () => {
        try {
            const response = await fetch("http://localhost:5151/api/orders", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    const getSingleOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:5151/api/orders/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch order:", error);
        }
    };

    const addOrder = async (order) => {
        try {
            const response = await fetch("http://localhost:5151/api/orders", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(order),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setOrders((prevOrders) => [...prevOrders, data]);
            getAllOrders();
        } catch (error) {
            console.error("Failed to add order:", error);
        }
    };

    const editOrder = async (id, order) => {
        try {
            const response = await fetch(`http://localhost:5151/api/orders/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(order),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
            }
    
            const data = await response.json();
            setOrders((prevOrders) =>
                prevOrders.map((o) => (o.or_id === id ? data : o))
            );
            getAllOrders();
        } catch (error) {
            console.error("Failed to edit order:", error);
            alert(`Failed to edit order: ${error.message}`);
        }
    };
    
    

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:5151/api/orders/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setOrders((prevOrders) => prevOrders.filter((order) => order.or_id !== id));
        } catch (error) {
            console.error("Failed to delete order:", error);
        }
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                token,
                getAllOrders,
                getSingleOrder,
                addOrder,
                editOrder,
                deleteOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}