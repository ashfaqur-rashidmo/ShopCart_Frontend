import React from "react";
import { Title } from "./Text";
import Image from "next/image";
import Link from "next/link";

const HomeCategories = ({ categories }) => {

  
  console.log("HOME CATEGORIES RECEIVED:", categories);

  if (!Array.isArray(categories)) {
    console.log("Not an array:", categories);
    return null;
  }

  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title>Popular Categories</Title>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {categories.slice(0, 6).map((category) => (
          <div
            key={category._id}
            className="bg-shop_light_bg p-5 flex items-center gap-3"
          >
            {category?.image && (
              <div className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect h-20 w-20 p-1">
                <Link href={`/category/${category.slug}`}>
                  <Image
                    src={category.image}
                    alt="category image"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </Link>
              </div>
            )}

            <div className="space-y-1">
              <h3 className="text-base font-semibold">{category.title}</h3>
              <p className="text-sm">
                Items Available
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default HomeCategories;
