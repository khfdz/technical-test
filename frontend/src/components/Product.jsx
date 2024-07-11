import React, { useState, useContext } from "react";
import ProductAdd from "../components/ProductAdd";
import ProductList from "../components/ProductList";
import CategoryAdd from "../components/CategoriesAdd";
import CategoriesList from "../components/CategoriesList";
import Cart from "./Cart";
import { ProductContext } from "../context/ProductContext";

const Product = () => {
  const { products } = useContext(ProductContext);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.or_pd_id === product.pd_id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].or_amount++;
    } else {
      updatedCart.push({ or_pd_id: product.pd_id, or_name: product.pd_name, or_price: product.pd_price, or_amount: 1 });
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

  const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    return formattedValue.replace(/^Rp/, 'IDR');
  };
  

  return (
    <div className="mt-4">
      <CategoryAdd />
      <CategoriesList />
      <ProductAdd />
      <ProductList addToCart={addToCart} formatCurrency={formatCurrency}/>
      <Cart 
        cart={cart} 
        setCart={setCart} 
        removeCartItem={removeCartItem} 
        decreaseQuantity={decreaseQuantity} 
        increaseQuantity={increaseQuantity} 
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default Product;
