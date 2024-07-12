import React, { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { ProductContext } from "../context/ProductContext";
import OrderList from "./OrderList";

const Order = () => {
  const { orders, deleteOrder, token, editOrder } = useContext(OrderContext);
  const { products } = useContext(ProductContext);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedProducts, setEditedProducts] = useState([]);

  const handleDeleteAll = async (orderId) => {
    try {
      if (!token) throw new Error("You are not logged in");
      await deleteOrder(orderId);
      alert("All products in the order deleted successfully!");
    } catch (error) {
      alert(`Failed to delete all products in the order: ${error.message}`);
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setEditedProducts(order.or_pd_id.map(item => ({
      pd_id: item.pd_id.pd_id,
      or_amount: item.or_amount,
    })));
  };

  const handleEditOrder = async () => {
    try {
      await editOrder(editingOrder.or_id, { order_products: editedProducts });
      alert("Order updated successfully!");
      setEditingOrder(null);
    } catch (error) {
      alert(`Failed to update order: ${error.message}`);
    }
  };

  const handleIncreaseProduct = (index) => {
    const updatedProducts = editedProducts.map((item, idx) => 
      idx === index ? { ...item, or_amount: item.or_amount + 1 } : item
    );
    setEditedProducts(updatedProducts);
  };

  const handleDecreaseProduct = (index) => {
    const updatedProducts = editedProducts.map((item, idx) => 
      idx === index && item.or_amount > 0 ? { ...item, or_amount: item.or_amount - 1 } : item
    );
    setEditedProducts(updatedProducts);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...editedProducts];
    updatedProducts[index][name] = Number(value);
    setEditedProducts(updatedProducts);
  };

  const handleProductChange = (e, index) => {
    const selectedProduct = products.find(product => product.pd_id === Number(e.target.value));
    const updatedProducts = [...editedProducts];
    updatedProducts[index].pd_id = selectedProduct.pd_id;
    setEditedProducts(updatedProducts);
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Orders</h1>
      <OrderList
        orders={orders}
        handleDeleteAll={handleDeleteAll}
        handleEditClick={handleEditClick}
        editingOrder={editingOrder}
        editedProducts={editedProducts}
        handleEditOrder={handleEditOrder}
        handleIncreaseProduct={handleIncreaseProduct}
        handleDecreaseProduct={handleDecreaseProduct}
        setEditingOrder={setEditingOrder}
        handleInputChange={handleInputChange}
        products={products}
        handleProductChange={handleProductChange}
      />
    </div>
  );
};

export default Order;
