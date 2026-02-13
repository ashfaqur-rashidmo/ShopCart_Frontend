// import React from 'react'
// import { extraData, Title } from './Text'
// import Link from 'next/link'
// import Image from 'next/image'

// const ShopByBrand = async() => {
  
//   const res = await fetch('http://localhost:5000/api/brands', {cache: 'no-store'})
//   const {data: brands} = await res.json()

//   return (
//     <div className='mb-10 lg:mb-10 bg-shop_light_bg p-5 lg:p-7 rounded-md'>
//       <div className='flex items-center gap-5 justify-between mb-10'>
//        <Title>
//         Shop By Brands
//         </Title>
//         <Link href={"/shop"} className='text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect'>
//         View All
//         </Link>  
//       </div>
//       <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5'>
       
//        {brands?.map((brand)=>(
//         <Link key={brand._id} href={`/shop?brand=${brand.slug}`} className='bg-white w-36 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_dark_green/20 hovereffect'>
//         {brand?.image && (
//           <Image src={brand.image} alt={brand.name} width={250} height={100} className='w-32 h-20 object-contain'/>
//         )}
//         </Link>
//        ))}

//       </div>
//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-16 gap-2.5 p-2 shadow-sm shadow-shop_light_green/20 py-5'>
//       {extraData?.map((item,index)=>(
//         <div key={index} className='flex items-center gap-3 group text-lightColor hover:text-shop_light_green'>
//           <span className='inline-flex scale-100 group-hover:scale-90 hoverEffect'>
//             {item?.icon}
//           </span>
//           <div className='text-sm'>
//             <p className='text-darkColor/80 font-bold capitalize'>
//              {item?.title} 
//             </p>
//             <p className='text-lightColor'>
//             {item?.description}
//             </p>
//           </div>
//         </div>
//       ))}
//       </div>  
//     </div>
//   )
// }

// export default ShopByBrand



"use client";
import React, { useEffect, useState } from "react";
import { Title } from "./Text";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ShopByBrand = () => {
  const [brands, setBrands] = useState([]);
  const router = useRouter();

  // fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/brands", {
          cache: "no-store",
        });
        const data = await res.json();
        setBrands(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Brands fetch error:", err);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (slug) => {
    router.push(`/shop?brand=${slug}`);
  };

  return (
    <div className="mb-10 lg:mb-10 bg-shop_light_bg p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title>Shop By Brands</Title>
        <button
          onClick={() => router.push("/shop")}
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {brands?.map((brand) => (
          <button
            key={brand._id}
            onClick={() => handleBrandClick(brand.slug)}
            className="bg-white w-36 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
          >
            {brand?.image && (
              <Image
                src={brand.image}
                alt={brand.name}
                width={250}
                height={100}
                className="w-32 h-20 object-contain"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrand;

