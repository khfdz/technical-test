import React, { useContext, useState } from "react";
import { CategoriesContext } from "../context/CategoriesContext";

const CategoryList = () => {
  const { categories, deleteCategory, editCategory, token } = useContext(CategoriesContext);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({ ct_name: "", ct_code: "" });

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
      alert(`Failed to delete category: ${error.message}`);
    }
  };

  const handleEditCategory = (category) => {
    if (!token) {
      alert("You are not logged in");
      return;
    }
    setEditCategoryId(category.ct_id);
    setEditedCategory({ ct_name: category.ct_name, ct_code: category.ct_code });
  };

  const saveEditedCategory = async () => {
    try {
      if (!token) {
        throw new Error("You are not logged in");
      }
      if (!editCategory) {
        throw new Error("Edit category function is not available.");
      }

      await editCategory(editCategoryId, editedCategory);
      setEditCategoryId(null);
      alert("Category edited successfully!");
    } catch (error) {
      alert(`Failed to edit category: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const cancelEdit = () => {
    setEditCategoryId(null);
    setEditedCategory({ ct_name: "" });
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
            <React.Fragment key={category.ct_id}>
              <tr>
                <td className="border px-4 py-2 text-center">{category.ct_id}</td>
                <td className="border px-4 py-2 text-center">{category.ct_code}</td>
                <td className="border px-4 py-2 text-center">{category.ct_name}</td>
                <td className="border px-4 py-2 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.ct_id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {editCategoryId === category.ct_id && (
                <tr>
                  <td colSpan="5" className="border px-4 py-2">
                    <p>Edit form for Category ID: {category.ct_id}</p>
                    <div className="space-x-2 ">
                      <input
                        type="text"
                        name="ct_name"
                        value={editedCategory.ct_name}
                        onChange={handleInputChange}
                        placeholder="Category Name"
                        className="border px-4 py-2 mr-2"
                        required
                      />
                     
                        <button
                          onClick={saveEditedCategory}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
            
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
