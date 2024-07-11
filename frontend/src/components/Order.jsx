import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const Order = () => {
  const { orders, deleteOrder, token } = useContext(OrderContext);

  const handleDeleteOrder = async (orderId) => {
    try {
      if (!token) {
        throw new Error("You are not logged in");
      }
      if (!deleteOrder) {
        throw new Error("Delete order function is not available.");
      }

      await deleteOrder(orderId);
      alert("Order deleted successfully!");
    } catch (error) {
      alert(`Failed to delete order: ${error.message}`);
    }
  };

  
  const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    return formattedValue.replace(/^Rp/, 'IDR');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Orders</h1>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.or_id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">
                {order.or_pd_id.map((item, idx) => (
                  <div key={idx}>
                    {item.pd_id.pd_name}
                    {idx !== order.or_pd_id.length - 1 && ", "}
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.or_pd_id.map((item, idx) => (
                  <div key={idx}>{formatCurrency(item.pd_id.pd_price)}</div> 
                ))}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.or_pd_id.map((item, idx) => (
                  <div key={idx}>{item.or_amount}</div>
                ))}
              </td>
              <td className="border px-4 py-2 text-center">
                {formatCurrency(
                  order.or_pd_id.reduce((acc, cur) => acc + cur.pd_id.pd_price * cur.or_amount,0)
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => console.log(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteOrder(order.or_id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
