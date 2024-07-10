import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Cart from "./Cart";

const Product = () => {
  const { products, addProduct, deleteProduct } = useContext(ProductContext); 
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({
    pd_name: "",
    pd_price: "",
    pd_ct_id: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    setNewProduct({ pd_name: "", pd_price: "", pd_ct_id: "" });
  };

  const addToCart = (product) => {
    const updatedCart = [...cart]; 
    const existingItemIndex = updatedCart.findIndex(item => item.or_pd_id === product.pd_id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].or_amount++;
    } else {
      updatedCart.push({ or_pd_id: product.pd_id, or_amount: 1 }); 
    }

    setCart(updatedCart); 
  };

  const removeCartItem = (productId) => {
    const updatedCart = cart.filter(item => item.or_pd_id !== productId);
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.or_pd_id === productId);

    if (existingItemIndex !== -1) {
      if (updatedCart[existingItemIndex].or_amount > 1) {
        updatedCart[existingItemIndex].or_amount--;
        setCart(updatedCart);
      }
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.or_pd_id === productId);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].or_amount++;
      setCart(updatedCart);
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
        <input
          type="number"
          name="pd_ct_id"
          value={newProduct.pd_ct_id}
          onChange={handleInputChange}
          placeholder="Category ID"
          className="border px-4 py-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </form>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pd_id}>
              <td className="border px-4 py-2 text-center">{product.pd_name}</td>
              <td className="border px-4 py-2 text-center">{product.pd_price}</td>
              <td className="border px-4 py-2 flex items-center justify-center space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
          ))}
        </tbody>
      </table>

      <Cart cart={cart} removeCartItem={removeCartItem} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} />
    </div>
  );
};

export default Product;
