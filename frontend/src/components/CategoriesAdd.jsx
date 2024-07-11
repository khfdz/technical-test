import React, { useContext, useState } from "react";
import { CategoriesContext } from "../context/CategoriesContext";

const AddCategory = () => {
  const { addCategory,token } = useContext(CategoriesContext);
  const [newCategory, setNewCategory] = useState({ ct_name: "" });

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        throw new Error("You are not logged in");
      }
      if (!addCategory) {
        throw new Error("Add category function is not available.");
      }
      await addCategory({ ...newCategory, token });
      setNewCategory({ ct_name: "" });
      alert("Category added successfully!");
    } catch (error) {
      alert(`Failed to add category: ${error.message}`);
    }
  };

  

  return (
    <div>
      <p className="text-xl font-bold mb-2">Add Category</p>
      <form onSubmit={handleAddCategory} className="mb-4">
        <input
          type="text"
          name="ct_name"
          value={newCategory.ct_name}
          onChange={handleCategoryInputChange}
          placeholder="Category Name"
          className="border px-4 py-2 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
