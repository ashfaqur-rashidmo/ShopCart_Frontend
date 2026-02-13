// import { getBrand } from '@/sanity/queries';
// import React from 'react'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

// const ProductCharacteristics = async({product}) => {
//     const brand = await getBrand(product?.slug?.current);
//     console.log(brand);
    
//   return (
//     <Accordion type="single" collapsible>
//      <AccordionItem value="item-1">
//       <AccordionTrigger>{product?.name}: Characteristics</AccordionTrigger>
//       <AccordionContent>
//         <p>Brand: {brand && <span>{brand[0]?. brandName}</span>}</p>
//       </AccordionContent>
//      </AccordionItem>
//     </Accordion>
//   )
// }

// export default ProductCharacteristics

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristicsClient = ({ product, brand }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {product?.name}: Characteristics
        </AccordionTrigger>

        <AccordionContent>
          <p className="flex items-center justify-between">
            Brand:{" "}
            <span className="ml-1 font-semibold tracking-wide">
              {product?.brand}
            </span>
          </p>

          <p className="flex items-center justify-between">
            Collection:{" "}
            <span className="ml-1 font-semibold tracking-wide">
              2025
            </span>
          </p>

          
          <p className="flex items-center justify-between">
            Type:{" "}
            <span className="ml-1 font-semibold tracking-wide">
              {product?.category}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Stock:{" "}
            <span className="ml-1 font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristicsClient;
