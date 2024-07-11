import React, { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext";

const CategoryList = () => {
  const { categories, deleteCategory, token } = useContext(CategoriesContext);

  const handleDeleteCategory = async (categoryId) => {
    try {
      if (!token) {
        throw new Error("You are not logged in");
      }
      if (!deleteCategory) {
        throw new Error("Delete category function is not available.");
      }

      await deleteCategory(categoryId);
      alert("Category deleted successfully!");
    } catch (error) {
      // console.error("Failed to delete category:", error);
      alert(`Failed to delete category: ${error.message}`);
    }
  };

  return (
    <div>
      <p className="text-xl font-bold mb-2">Category List</p>
      <table className="table-auto w-1/2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.ct_id}>
              <td className="border px-4 py-2 text-center">{category.ct_id}</td>
              <td className="border px-4 py-2 text-center">{category.ct_code}</td>
              <td className="border px-4 py-2 text-center">{category.ct_name}</td>
              <td className="border px-4 py-2 flex justify-center space-x-4">
                <button
                  onClick={() => handleDeleteCategory(category.ct_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
