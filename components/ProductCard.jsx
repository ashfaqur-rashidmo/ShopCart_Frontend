import { Cat, FlameIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddWishList from './AddWishList'
import { Title } from './Text'
import PriceView from './PriceView'
import AddToCartButton from './AddToCartButton'
import { useCart } from './CartContext/CartContext.jsx'

const ProductCard = ({product}) => {
  const {addToCart} = useCart();
  return (
    <div className='text-sm border-[1px] border-darkBlue/20 rounded-md bg-white'>
      <div className='relative group overflow-hidden bg-shop_light_bg'>
          {product?.images?.[0] ? (
  <Link href={`/product/${product.slug}`}>
    <Image
      src={product.images[0]}
      alt={product.name || 'productimage'}
      width={500}
      height={500}
      className="w-full h-64 object-contain overflow-hidden transition-transform hover:scale-110"
      loading="lazy"
    />
  </Link>
) : (
  <div className="w-full h-64 flex items-center justify-center bg-gray-100">
    <p className="text-gray-500">No Image Available</p>
  </div>
)}

           
           <AddWishList product={product}/>
           {product?.status === "sale" && (<p className='absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect'>Sale!</p>
          )}

          {product?.status === "new" && (<p className='absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect'>New Arrival</p>
          )}
          
          {product?.status === "hot" && <Link href={"/deal"} className='absolute top-2 left-2 z-10 text-xs border border-shop_orange/50 px-2 rounded-full group-hover:border-shop_orange group-hover:text-shop_orange hoverEffect'>
          <FlameIcon size={18} className='text-shop_orange/50 group-hover:text-shop_orange hoverEffect'/>
          </Link>
          }
     </div>
     <div className='p-3'>
      <p className='uppercase text-xs text-shop_light_text'>
   {product?.category}
</p>

      <Title className="text-sm line-clamp-1">{product?.name}</Title>
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-0.5'>
          {[...Array(5)].map((_,index) => (
            <StarIcon size={13} key={index} className={index < 4 ? "text-shop_lighter_green" : "text-shop_lighter_text"} 
            fill={index < 4 ? "#93D991" : "#ababab"}
            />
          ))}
        </div>
        <p className='text-shop_light_text text-xs tracking-wide'>5 reviews</p>
      </div>
      <div className='flex gap-2'>
      <p>In Stock</p>
      <p className={`${product?.stock === 0 ? "text-red-600" : "text-shop_light_green font-semibold"}`}>{(product?.stock) > 0 ? product?.stock : "Unavailable"}</p>  
      </div>

      <PriceView price={product?.price} 
      discount={product?.discount} 
      className="text-sm"
      />

      <AddToCartButton product={product} className="w-36 rounded-full "/>  
        
      </div>
      
    </div>
  )
}

export default ProductCard