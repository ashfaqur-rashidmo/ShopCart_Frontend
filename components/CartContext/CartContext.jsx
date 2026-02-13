"use client"
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";


const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    
const addToCart = (product) => {
  const existing = cartItems.find(item => item._id === product._id);

  if (existing) {
    if (existing.quantity >= product.stock) {
      toast.error("Stock limit reached!");
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    toast.success("Added one more item");
    return;
  }

  if (product.stock === 0) {
    toast.error("Out of stock");
    return;
  }

  setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
  toast.success("Product added to cart");
};



    // increase quantity
const increaseQty = (id) => {
  const item = cartItems.find(i => i._id === id);
  if (!item) return;

  if (item.quantity >= item.stock) {
    toast.error("Stock limit reached!");
    return;
  }

  setCartItems(prev =>
    prev.map(i =>
      i._id === id ? { ...i, quantity: i.quantity + 1 } : i
    )
  );

  toast.success("Quantity increased");
};





      //  Decrease quantity
const decreaseQty = (id) => {
  const item = cartItems.find(i => i._id === id);
  if (!item) return;

  if (item.quantity <= 1) {
    toast.error("Minimum quantity is 1");
    return;
  }

  setCartItems(prev =>
    prev.map(i =>
      i._id === id ? { ...i, quantity: i.quantity - 1 } : i
    )
  );

  toast.success("Quantity decreased");
};



    //  Remove item
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const resetCart = () => {
    setCartItems([]);
  }

     // Total quantity (for navbar icon)
  const totalqty = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

    return (
        <CartContext.Provider value={{ cartItems, addToCart,totalqty,decreaseQty,removeFromCart,increaseQty,resetCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);