import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth"; // Import AuthContext untuk mendapatkan token

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { token } = useContext(AuthContext); // Mendapatkan token dari AuthContext
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let response = await fetch("http://localhost:5151/api/product");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            setProducts(data);
            console.log("Data Product: ", data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const getSingleProduct = async (id) => {
        try {
            let response = await fetch(`http://localhost:5151/api/product/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
    };

    const addProduct = async (product) => {
        try {
            const response = await fetch("http://localhost:5151/api/product", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setProducts((prevProducts) => [...prevProducts, data]);
            console.log("Data Add: ", data);
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const editProduct = async (id, product) => {
        try {
            const response = await fetch(`http://localhost:5151/api/product/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data Edit: ", data);
            
        } catch (error) {
            console.error("Failed to edit product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5151/api/product/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
            getProducts();
            console.log("Data Delete: ", data);
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                getProducts,
                getSingleProduct,
                addProduct,
                editProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
