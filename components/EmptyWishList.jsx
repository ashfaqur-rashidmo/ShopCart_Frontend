import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EmptyWishList = () => {
  return (
    <div className='max-w-md mx-auto text-center py-20'>
      <Heart size={50} className='mx-auto text-shop_light_green/70 mb-4'/>
        <h2 className='text-2xl font-bold'>Your Wish List is Empty</h2>
        <p className='text-shop_light_text mt-2'>Browse our products and add items to your wish list.</p>
        <div className='mt-8'>
        <Link href='/shop' className='items-center justify-center text-center border p-3.5 bg-shop_btn_dark_green/75 text-white rounded-md font-semibold'>Continue Shopping</Link>
        </div>  
    </div>
  )
}

export default EmptyWishList