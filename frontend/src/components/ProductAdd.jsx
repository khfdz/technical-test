import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { CategoriesContext } from "../context/CategoriesContext";

const ProductAdd = () => {
  const { addProduct, token } = useContext(ProductContext);
  const { categories } = useContext(CategoriesContext);
  const [newProduct, setNewProduct] = useState({
    pd_name: "",
    pd_price: "",
    pd_ct_id: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        throw new Error("You are not logged in");
      }
      if (!addProduct) {
        throw new Error("Add product function is not available.");
      }

      await addProduct(newProduct);
      setNewProduct({ pd_name: "", pd_price: "", pd_ct_id: "" });
      alert("Product added successfully!");
    } catch (error) {
      alert(`Failed to add product: ${error.message}`);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-xl font-bold mb-2">Add Product</p>
      <form onSubmit={handleAddProduct} className="mb-4">
        <input
          type="text"
          name="pd_name"
          value={newProduct.pd_name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="border px-4 py-2 mr-2"
          required
        />
        <input
          type="number"
          name="pd_price"
          value={newProduct.pd_price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className="border px-4 py-2 mr-2"
          required
        />
        <select
          name="pd_ct_id"
          value={newProduct.pd_ct_id}
          onChange={handleInputChange}
          className="border px-4 py-2 mr-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.ct_id} value={category.ct_id}>
              {category.ct_name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
