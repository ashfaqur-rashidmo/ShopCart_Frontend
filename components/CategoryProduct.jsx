"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

const CategoryProduct = ({ categories = [], slug }) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const uniqueCategories = Array.from(
    new Map(categories.map((item) => [item.slug, item])).values()
  );

  
  const fetchProducts = async (categorySlug) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categorySlug}`
      );
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (slug) {
      setCurrentSlug(slug);
      fetchProducts(slug);
    }
  }, [slug]);

  const handleCategoryChange = (newSlug) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    fetchProducts(newSlug);
  };

  return (
    <div className="py-6 flex flex-col md:flex-row gap-6">
      
      {/* SIDEBAR */}
      <aside className="md:w-60 w-full border rounded-md overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          {uniqueCategories.map((item) => (
            <button
              key={item._id}
              onClick={() => handleCategoryChange(item.slug)}
              className={`w-full text-left px-4 py-3 border-b text-sm font-medium transition
                ${
                  item.slug === currentSlug
                    ? "bg-shop_orange text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </aside>

      {/* PRODUCTS */}
      <section className="flex-1">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
          >
            {products.map((product) => (
              <motion.div key={product._id} layout>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <NoProductAvailable selectedTab={currentSlug} />
        )}
      </section>
    </div>
  );
};

export default CategoryProduct;
