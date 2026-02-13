import Shop from "@/components/Shop";
import { Suspense } from "react";

const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
    );

    if (!res.ok) return [];

    const json = await res.json();

    return Array.isArray(json) ? json : json.data || [];
  } catch (err) {
    console.error("Fetch categories failed:", err);
    return [];
  }
};

const ShopPage = async () => {
  const categories = await fetchCategories();

  console.log("Fetched categories for page:", categories);

  return (
  <Suspense fallback={<div>Loading shop...</div>}>
  <Shop initialCategories={categories} />;
</Suspense>
  );
};

export default ShopPage;



