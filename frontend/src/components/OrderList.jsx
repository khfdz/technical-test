import React from "react";

const OrderList = ({
  orders,
  handleDeleteAll,
  handleEditClick,
  editingOrder,
  editedProducts,
  handleEditOrder,
  handleIncreaseProduct,
  handleDecreaseProduct,
  setEditingOrder,
  handleInputChange,
  products,
  handleProductChange
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value).replace(/^Rp/, 'IDR');
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
  };

  return (
    <table className="table-auto w-full mb-4">
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
          <React.Fragment key={order.or_id}>
            <tr>
              <td className="border px-4 py-2 text-center" rowSpan={order.or_pd_id.length + 1}>{index + 1}</td>
              <td className="border px-4 py-2 text-center" colSpan={5}>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteAll(order.or_id)}>Delete All</button>
              </td>
            </tr>
            {order.or_pd_id.map((item, idx) => (
              <tr key={item.pd_id.pd_id}>
                <td className="border px-4 py-2">
                  {editingOrder && editingOrder.or_id === order.or_id ? (
                    <select
                      value={editedProducts[idx].pd_id}
                      onChange={(e) => handleProductChange(e, idx)}
                      className="border rounded"
                    >
                      <option value="" disabled>Select Product</option>
                      {products.map(product => (
                        <option key={product.pd_id} value={product.pd_id}>
                          {product.pd_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.pd_id ? item.pd_id.pd_name : "Product not found"
                  )}
                </td>
                <td className="border px-4 py-2 text-center">{item.pd_id ? formatCurrency(item.pd_id.pd_price) : "N/A"}</td>
                <td className="border px-4 py-2 text-center">
                  {editingOrder && editingOrder.or_id === order.or_id ? (
                    <div className="flex items-center justify-center space-x-4">
                      <button onClick={() => handleDecreaseProduct(idx)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">-</button>
                      <p className="w-12 text-center">{editedProducts[idx].or_amount}</p>
                      <button onClick={() => handleIncreaseProduct(idx)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">+</button>
                    </div>
                  ) : (
                    item.or_amount
                  )}
                </td>
                <td className="border px-4 py-2 text-center">{formatCurrency(item.pd_id ? item.pd_id.pd_price * item.or_amount : 0)}</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    {editingOrder && editingOrder.or_id === order.or_id ? (
                      <>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditOrder}>Save</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(order)}>Edit</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
