import React from "react";
import Shop from "@/components/Shop";

// Backend থেকে categories fetch
const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/categories", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Fetch categories failed:", err);
    return [];
  }
};

// Backend থেকে brands fetch
const fetchBrands = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/brands", { cache: "no-store" });
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

