import Shop from "@/components/Shop";

const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      { cache: "no-store" }
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

  return <Shop initialCategories={categories} />;
};

export default ShopPage;



