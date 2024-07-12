import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import { ProductContext } from "../context/ProductContext";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const { token } = useContext(AuthContext); 
    const { getProducts } = useContext(ProductContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            let response = await fetch("http://localhost:5151/api/categories");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            setCategories(data);
            console.log("Data Categories: ", data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const getSingleCategory = async (id) => {
        try {
            let response = await fetch(`http://localhost:5151/api/categories/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch category:", error);
        }
    };

    const addCategory = async (category) => {
        try {
            const response = await fetch("http://localhost:5151/api/categories", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(category),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories((prevCategories) => [...prevCategories, data]);
            console.log("Data Add: ", data);
        } catch (error) {
            console.error("Failed to add category:", error);
        }
    };

    const editCategory = async (id, category) => {
        try {
            const response = await fetch(`http://localhost:5151/api/categories/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(category),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories((prevCategories) => prevCategories.map((c) => (c.ct_id === id ? data : c)));
            getCategories();
            getProducts();
            console.log("Data Edit: ", data);
        } catch (error) {
            console.error("Failed to edit category:", error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:5151/api/categories/${id}`, {
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
            setCategories((prevCategories) => prevCategories.filter((c) => c.ct_id !== id));
            console.log("Data Delete: ", data);
        } catch (error) {
            console.error("Failed to delete category:", error);
        }
    };

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                token,
                getCategories,
                getSingleCategory,
                addCategory,
                editCategory,
                deleteCategory,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
}