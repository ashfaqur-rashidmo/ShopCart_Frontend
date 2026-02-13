import React from "react";
import Shop from "@/components/Shop";

const fetchCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Fetch categories failed:", err);
    return [];
  }
};

const fetchBrands = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error("Fetch brands failed:", err);
    return [];
  }
};

const ShopPage = async () => {
  const categories = await fetchCategories();
  const brands = await fetchBrands();

  return (
    <div>
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;

