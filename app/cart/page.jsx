'use client';

import { useCart } from "@/components/CartContext/CartContext.jsx";
import Container from "@/components/Container";
import FavouriteButton from "@/components/FavouriteButton";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";




const CartPage = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart,resetCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
      </div>
    );
  }


  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.05; 
  const total = subtotal - discount;

 

  return (
    <Container className={`p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4`}>
       {/* left column cart items*/}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-shop_dark_green"/>
          Shopping Cart
        </h2>

        {cartItems.map((item) => (
         <div
  key={item._id}
  className="flex w-full flex-col md:flex-row gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
>
  {/* LEFT SIDE */}
  <div className="flex flex-1 gap-4">
    {/* Image */}
    <Link href={`/product/${item.slug}`} className="shrink-0">
    <img
      src={item.images?.[0] || "/placeholder.png"}
      alt={item.name}
      className="h-24 w-24 object-cover rounded border hover:scale-110 transition"
    />
    </Link>

    {/* Info */}
    <div className="flex flex-col gap-1 flex-1">
      <p className="font-semibold text-lg">{item.name}</p>
      <p className="text-md">
        Variant: <span className="font-bold">{item.category}</span>
      </p>
      <p className="text-md">
        Status: <span className="font-bold">{item.status}</span>
      </p>

      {/* Icons row */}
      <div className="mt-3 flex items-center gap-3">
        <FavouriteButton product={item} showProduct />

        <button
          onClick={() => removeFromCart(item?._id)}
          className="p-1 rounded hover:bg-red-50 transition"
        >
          <Trash2 className="h-5 w-5 hover:text-red-600" />
        </button>
      </div>
    </div>
  </div>

  {/* RIGHT SIDE (PRICE + QTY) */}
  <div className="flex flex-col items-end justify-between min-w-[120px]">
    {/* Price */}
    <p className="font-bold text-lg">
      ${(item.price * item.quantity).toFixed(3)}
    </p>

    {/* Quantity (exactly under price) */}
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={() => decreaseQty(item?._id)}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        -
      </button>

      <span className="min-w-[20px] text-center font-medium">
        {item.quantity}
      </span>

      <button
        onClick={() => increaseQty(item?._id)}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        +
      </button>
    </div>
  </div>
</div>

        ))}
       
         {/* reset cart */}
        <button onClick={() => {if (confirm("Are you sure you want to clear the cart?")) {
        resetCart();
        }}} 
        className="mt-4 bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 transition">Reset Cart</button>
      </div>


        {/* right column order summary */}
        <div className="space-y-6 border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-2">Order Summary</h3>
          <div className="flex justify-between text-gray-700">
            <span>SubTotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Discount</span>
            <span>{discount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="w-full mt-4 bg-shop_dark_green text-white font-semibold px-4 py-2 rounded hover:bg-shop_light_green transition">Proceed To Checkout</button>

          {/* delivery address section */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Delivery Address</h4>
            <div className="space-y-2">
              <label htmlFor="abcd" className="flex items-center gap-2">
                <input type="radio" name="address" defaultChecked className="accent-shop_dark_green" />
                <span className="text-gray-700">
               Satellite town Calabar, Ekpo okon last bus, Calabar, Cross River 551263

                </span>
              </label>

              <label className="flex items-center gap-2">
              <input type="radio" name="address" className="accent-shop_dark_green" />
              <span className="text-gray-700">1212, Nyahururu, Laikipia 1000</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="address" className="accent-shop_dark_green" />
              <span className="text-gray-700">Kolkata, Baruipur, Bali Chak, West Bengal 743387</span>
            </label>
            </div>
          </div>

        </div>
     
    </Container>
  );
};

export default CartPage;
