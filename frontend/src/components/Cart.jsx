import React, { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";

const Cart = ({ cart, setCart, removeCartItem, decreaseQuantity, increaseQuantity, formatCurrency }) => {
  const { addOrder, token } = useContext(OrderContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not logged in");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderProducts = cart.map(item => ({
      or_pd_id: item.or_pd_id,
      or_amount: item.or_amount
    }));

    const orderData = { order_products: orderProducts };

    try {
      const result = await addOrder(orderData);

      if (result) {
        setShowMessage(true); 
        setCart([]);
        alert("Your order will be processed soon!");
        clearCart();
      } else {
        alert("Thank you for your order!"); 
        clearCart();
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again later."); 
    }
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="mt-4">
      <p className="text-xl font-bold">Cart</p>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2 text-center">Product Name</th>
            <th className="px-4 py-2 text-center">Price</th>
            <th className="px-4 py-2 text-center">Quantity</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.or_pd_id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{item.or_name}</td>
              <td className="border px-4 py-2 text-center">{formatCurrency(item.or_price)}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => decreaseQuantity(item.or_pd_id)}>-</button>
                  <span className="px-2">{item.or_amount}</span>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => increaseQuantity(item.or_pd_id)}>+</button>
                </div>
              </td>
              <td className="border px-4 py-2 text-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => removeCartItem(item.or_pd_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xl font-bold mt-4">Total: {formatCurrency(cart.reduce((total, item) => total + item.or_price * item.or_amount, 0))}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleAddOrder}
          className={`py-2 px-4 rounded ${cart.length === 0 || !token ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold`}
        >
          Checkout
        </button>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="py-2 px-4 rounded bg-red-500 hover:bg-red-700 text-white font-bold"
          >
            Clear Cart
          </button>
        )}
      </div>

      
    </div>
  );
};

export default Cart;
