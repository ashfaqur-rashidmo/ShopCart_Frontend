"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "./WishlistContext/WishlistContext.jsx";

const FavouriteButton = ({ product, showProduct = false }) => {
  const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const isFav = product
    ? wishlistItems.some(item => item._id === product._id)
    : false;

  const handleToggle = () => {
    if (!product) return;

    if (isFav) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  // HEADER / ICON VERSION
  if (!showProduct) {
    return (
      <Link href="/wishlist" className="group relative">
        <Heart className="h-5 w-5 hover:text-shop_light_green hoverEffect" />

        {wishlistItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {wishlistItems.length}
          </span>
        )}
      </Link>
    );
  }

  // PRODUCT / CART VERSION
  return (
    <button
      onClick={handleToggle}
      className="group relative border border-shop_light_green/40 hover:border-shop_light_green p-1.5 rounded-sm transition"
    >
      <Heart
        className={`w-5 h-5 transition
          ${isFav ? "text-red-500 fill-red-500" : "text-shop_light_green/70"}
          group-hover:text-shop_light_green`}
      />
    </button>
  );
};

export default FavouriteButton;
