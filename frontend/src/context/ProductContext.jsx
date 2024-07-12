import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth"; 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { token } = useContext(AuthContext); 
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
            getProducts();
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
            setProducts((prevProducts) => prevProducts.map((p) => (p.pd_id === id ? data : p)));
            getProducts();
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
            await response.json();
            setProducts((prevProducts) => prevProducts.filter(product => product.pd_id !== id));
            console.log("Data Delete: ", id);
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                token,
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
