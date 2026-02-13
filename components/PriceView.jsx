// import React from 'react'
// import PriceFormat from './PriceFormat'

// const PriceView = ({price,discount,className}) => {
//   return (
//     <div>
//       <div>
//         <PriceFormat amount={price} className="text-shop_light_green"/>
//         {price && discount && (<PriceFormat amount={price - (discount + price) / 100} className="line-through text-xs"/>
//       )}
//       </div>
//     </div>
//   )
// }

// export default PriceView


import React from 'react'
import PriceFormat from './PriceFormat'

const PriceView = ({ price, discount, className }) => {
  const numericPrice = Number(price ?? 0)
  const numericDiscount = Number(discount ?? 0)

  // Discounted price only if discount > 0
  const discountedPrice =
    numericDiscount > 0 ? numericPrice - (numericPrice * numericDiscount / 100) : null

  return (
    <div className={`flex flex-row gap-1 ${className || ""}`}>
      {/* Original price */}
      {discountedPrice ? (
        <PriceFormat
          amount={numericPrice}
          className="line-through text-xs text-red-500"
        />
      ) : (
        <PriceFormat
          amount={numericPrice}
          className="text-shop_light_green font-semibold"
        />
      )}

      {/* Discounted price */}
      {discountedPrice !== null && (
        <PriceFormat
          amount={discountedPrice}
          className="text-shop_light_green font-semibold"
        />
      )}
    </div>
  )
}

export default PriceView
