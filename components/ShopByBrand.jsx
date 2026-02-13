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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`, {
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

