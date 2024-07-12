import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { CategoriesContext } from "../context/CategoriesContext";

const ProductList = ({ addToCart, formatCurrency }) => {
  const { products, deleteProduct, editProduct, token } = useContext(ProductContext);
  const { categories } = useContext(CategoriesContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ pd_name: "", pd_price: "", pd_ct_id: "" });
  const itemsPerPage = 20;

  const handleDeleteProduct = async (productId) => {
    try {
      if (!token) {
        throw new Error("You are not logged in");
      }
      if (!deleteProduct) {
        throw new Error("Delete product function is not available.");
      }

      await deleteProduct(productId);
      alert("Product deleted successfully!");
    } catch (error) {
      alert(`Failed to delete product: ${error.message}`);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue === "All" ? "All" : parseInt(selectedValue));
    setCurrentPage(1);
    setEditProductId(null); // Reset edit mode when category changes
  };

  const filteredProducts = selectedCategory === "All" ? products : products.filter(product => product.pd_ct_id && product.pd_ct_id.ct_id === selectedCategory);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setEditProductId(null); // Reset edit mode when page changes
  };

  const handleEditProduct = (product) => {
    if (!token) {
      alert("You are not logged in");
      return;
    }
    setEditProductId(product.pd_id);
    setEditedProduct({ pd_name: product.pd_name, pd_price: product.pd_price, pd_ct_id: product.pd_ct_id ? product.pd_ct_id.ct_id : "" });
  };

  const saveEditedProduct = async () => {
    try {
      if (!token) {
        throw new Error("You are not logged in");
      }
      if (!editProduct) {
        throw new Error("Edit product function is not available.");
      }

      await editProduct(editProductId, editedProduct);
      setEditProductId(null);
      alert("Product edited successfully!");
    } catch (error) {
      alert(`Failed to edit product: ${error.message}`);
    }
  };

  const cancelEdit = () => {
    setEditProductId(null);
    setEditedProduct({ pd_name: "", pd_price: "", pd_ct_id: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  return (
    <div>
      <p className="text-xl font-bold mt-4">Product List</p>
      <select onChange={handleCategoryChange} className="border px-4 py-2 mr-2 mt-2 mb-4">
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category.ct_id} value={category.ct_id}>{category.ct_name}</option>
        ))}
      </select>

      {/* Table of Products */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 w-8">ID</th>
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map((product, index) => (
            <React.Fragment key={product.pd_id}>
              <tr>
                <td className="border px-4 py-2 text-center w-8">{product.pd_id}</td>
                <td className="border px-4 py-2 text-center">{product.pd_code}</td>
                <td className="border px-4 py-2 text-center">{product.pd_ct_id ? product.pd_ct_id.ct_name : "No Category"}</td>
                <td className="border px-4 py-2 text-center">{product.pd_name}</td>
                <td className="border px-4 py-2 text-center">{formatCurrency(product.pd_price)}</td>
                <td className="border px-4 py-2 flex justify-center space-x-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteProduct(product.pd_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {/* Display edit form below the selected product row */}
              {editProductId === product.pd_id && (
                <tr>
                  <td colSpan="6" className="border px-4 py-2 space-x-2">
                    {/* Your edit form goes here */}
                    <p>Edit form for product ID: {product.pd_id}</p>
                    {/* Example of form inputs */}
                    <input
                      type="text"
                      name="pd_name"
                      value={editedProduct.pd_name}
                      onChange={handleInputChange}
                      className="border px-4 py-2 mr-2"
                    />
                    <input
                      type="number"
                      name="pd_price"
                      value={editedProduct.pd_price}
                      onChange={handleInputChange}
                      className="border px-4 py-2 mr-2"
                    />
                    <select
                      name="pd_ct_id"
                      value={editedProduct.pd_ct_id}
                      onChange={handleInputChange}
                      className="border px-4 py-2 mr-2 mt-2 mb-4"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.ct_id} value={category.ct_id}>
                          {category.ct_name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={saveEditedProduct}
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
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded ${currentPage === index + 1 ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
