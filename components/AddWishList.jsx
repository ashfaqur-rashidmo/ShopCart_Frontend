'use client'
import { cn } from '@/lib/utils'
import { Heart } from 'lucide-react'
import { useWishlist } from './WishlistContext/WishlistContext.jsx'

const AddWishList = ({ product }) => {
  const {
    addToWishlist,
    removeFromWishlist,
    wishlistItems
  } = useWishlist();

  //  product already in wishlist?
  const isWished = wishlistItems.some(
    item => item._id === product._id
  );

  const handleWishlist = () => {
    if (isWished) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className={cn("absolute top-2 right-2 z-10")}>
      <button
        onClick={handleWishlist}
        className={cn(
          "p-2 rounded-full hoverEffect",
          isWished
            ? "bg-shop_dark_green/70 text-white"
            : "hover:bg-shop_light_green hover:text-white"
        )}
      >
        <Heart
          size={15}
          className={isWished ? "text-white" : ""}
        />
      </button>
    </div>
  );
};

export default AddWishList;
