"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "./CartContext/CartContext";

const AddToCartButton = ({ product, className }) => {
  const { addToCart } = useCart();
  const [toast, setToast] = useState({ show: false, message: "" });


  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    addToCart(product);
    
    
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 400);
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "w-full bg-shop_light_green/80 text-shop_light_bg border border-shop_dark_green font-semibold hover:bg-shop_dark_green hoverEffect",
          className
        )}
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
      </Button>

     
      
    </>
  );
};

export default AddToCartButton;



