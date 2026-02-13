"use client"
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useCart } from './CartContext/CartContext.jsx'

const CartIcon = () => {
  const {totalqty} = useCart();
 
  return (
    <Link href={"/cart"} className='group relative'>
      <ShoppingBag className='h-5 w-5 hover:text-shop_light_green hoverEffect'/>

      {totalqty > 0 && (
        <span className='absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center'>
        {totalqty}
      </span>
      )}
     
    </Link>
  )
}

export default CartIcon