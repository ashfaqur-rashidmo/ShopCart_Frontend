"use client";

import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(item => item._id === product._id);

    if (exists) {
      toast.error("Already in wishlist");
      return;
    }

    setWishlistItems(prev => [...prev, { ...product }]);
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = (productId) => {
    const exists = wishlistItems.find(item => item._id === productId);
    if (!exists) return;

    setWishlistItems(prev =>
      prev.filter(item => item._id !== productId)
    );

    toast.success("Removed from wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
