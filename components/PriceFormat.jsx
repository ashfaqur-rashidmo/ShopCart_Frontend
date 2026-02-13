import React from 'react'
import { twMerge } from 'tailwind-merge'

const PriceFormat = ({amount,className}) => {
    const formatePrice =  Number(amount).toLocaleString("en-US",
        {
            currency:"USD",
            style: "currency",
            minimumFractionDigits: 2,
        }
    )
    // console.log("PriceFormat amount:", amount, typeof amount);
    
 
  return (
    <span className={twMerge("text-sm font-semibold text-darkColor",className)}>
     {formatePrice}
    </span>
  )
}

export default PriceFormat