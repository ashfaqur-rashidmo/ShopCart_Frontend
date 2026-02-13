'use client'

import { useCart } from "@/components/CartContext/CartContext";
import EmptyWishList from "@/components/EmptyWishList";
import { useWishlist } from "@/components/WishlistContext/WishlistContext";
import { X } from "lucide-react";
import Image from "next/image";

const Wishlistpage = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    updateQuantity,
   
  } = useWishlist();

  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();


  if (wishlistItems.length === 0) {
    return <EmptyWishList />;
  }

 


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* header */}
      <div className="grid grid-cols-[40px_90px_1fr_240px_140px_120px_220px] gap-4 font-semibold text-sm border-b pb-4">
        <div />
        <div>Image</div>
        <div>Product</div>
        <div>Category</div>
        <div>Status</div>
        <div>Price</div>
        <div>Action</div>
      </div>

      {/* rows */}
      {wishlistItems.map(item => {
        const subtotal = item.price * item.quantity;
        
         const cartItem = cartItems.find(
         cart => cart._id === item._id
         );
        return (
          <div
            key={item._id}
            className="grid grid-cols-[40px_90px_1fr_240px_140px_120px_220px] gap-4 items-center py-6 border-b"
          >
            {/* remove */}
            <button
              onClick={() => removeFromWishlist(item._id)}
              className="hover:text-red-500"
            >
              <X />
            </button>

            {/* image */}
            <div className="w-20 h-20 border rounded flex items-center justify-center">
              <Image
                src={item.images?.[0]}
                alt={item.name}
                width={70}
                height={70}
                className="object-contain"
              />
            </div>

            {/* product */}
            <p className="font-medium leading-snug">
              {item.name}
            </p>

            {/* category */}
            <p className="text-xs uppercase text-shop_light_text">
              {item.category}
            </p>

            {/* status */}
            {item.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                In Stock
              </span>
            ) : (
              <span className="text-red-500 font-semibold">
                Out of Stock
              </span>
            )}

            {/* price */}
            <p className="font-semibold">
              ${item.price.toFixed(2)}
            </p>

        
            {/* action */}
{item.stock > 0 ? (
  cartItem ? (
    /*  Already in cart → show + - */
    <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">
        Quantity
      </p>

      <div className="flex items-center border rounded-sm">
      <button
        onClick={() => decreaseQty(item._id)}
        className="border-r px-2 py-1 hover:bg-gray-300"
      >
        -
      </button>

      <span className="font-semibold px-2 py-1">
        {cartItem.quantity}
      </span>

      <button
        onClick={() => increaseQty(item._id)}
        className="border-l px-2 py-1 hover:bg-gray-300"
      >
        +
      </button>
      </div>
    </div>
    <hr />
    <div className="flex items-center justify-between font-semibold">
      <span>SubTotal</span>
      <span>${(cartItem.price * cartItem.quantity)}</span>
    </div>

    </div>
    
    
  ) : (

    /*  Not in cart => show Add to Cart */
    <button
      onClick={() => addToCart(item)}
      className="bg-shop_dark_green text-white px-4 py-2 rounded-md font-semibold hover:bg-shop_light_green"
    >
      Add to Cart
    </button>
  )
) : (
  <button
    disabled
    className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md font-semibold"
  >
    Out of Stock
  </button>
)}

        
      </div>
      );
      })}

      {/* reset */}
      <button
        onClick={() =>
          wishlistItems.forEach(item =>
            removeFromWishlist(item._id)
          )
        }
        className="mt-8 px-8 py-3 border rounded-md font-semibold hover:bg-gray-100"
      >
        Reset Favorite
      </button>
    </div>
  );
};

export default Wishlistpage;
