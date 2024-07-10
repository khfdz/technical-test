import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Cart = ({ cart, removeCartItem, decreaseQuantity, increaseQuantity }) => {
  const { products } = useContext(ProductContext);

  return (
    <div>
      <h2 className="text-xl font-bold mt-4">Cart Items</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">{products.find((product) => product.pd_id === item.or_pd_id)?.pd_name}</td>
              <td className="border px-4 py-2 text-center">{products.find((product) => product.pd_id === item.or_pd_id)?.pd_price}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => decreaseQuantity(item.or_pd_id)}
                  >
                    -
                  </button>
                  <span>{item.or_amount}</span>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => increaseQuantity(item.or_pd_id)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="flex items-center justify-center border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => removeCartItem(item.or_pd_id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4">Cart Total: {cart.reduce((total, item) => total + item.or_amount, 0)}</p>
      <p className="mt-4">Sub Total: {cart.reduce((total, item) => total + item.or_amount * products.find((product) => product.pd_id === item.or_pd_id)?.pd_price, 0)}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Order</button>
    </div>
  );
};

export default Cart;
