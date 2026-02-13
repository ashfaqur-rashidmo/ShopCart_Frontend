"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "@/components/ProductCard";
import NoProductAvailable from "@/components/NoProductAvailable";
import Container from "@/components/Container";
import Loader from "@/components/Loader";

const CategoryPage = ({ params }) => {
  // ✅ REQUIRED in Next 15+
  const { slug } = React.use(params);

  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();

    // ✅ unique by slug
    const unique = Array.from(
      new Map((Array.isArray(data) ? data : []).map(c => [c.slug, c])).values()
    );

    setCategories(unique);
  };

  const loadProducts = async (slug) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/categories/${slug}`);
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
    setCurrentSlug(slug);
    loadCategories();
    loadProducts(slug);
  }, [slug]);

  const handleCategoryClick = (slug) => {
    if (slug === currentSlug) return;
    router.push(`/category/${slug}`); // ✅ route change
  };

  return (
    <Container>
    <div className="py-6 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="md:w-60 w-full border rounded-md overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`w-full text-left px-4 py-3 border-b text-sm font-medium
                ${
                  cat.slug === currentSlug
                    ? "bg-shop_orange text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Products */}
      <section className="flex-1">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader className="animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
          >
            {products.map(product => (
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
    </Container>
  );
};

export default CategoryPage;






// "use client";

// import React, { useEffect, useState } from "react";
// import CategoryProduct from "@/components/CategoryProduct";

// const CategoryProduct = ({ params }) => {
//   const { slug } = params;

//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch categories
//     fetch("http://localhost:5000/api/categories")
//       .then(res => res.json())
//       .then(data => setCategories(data.data || []));

//     // Fetch products by category
//     fetch(`http://localhost:5000/api/products/category/${slug}`)
//       .then(res => res.json())
//       .then(data => setProducts(data.products || []));
//   }, [slug]);

//   return (
//     <CategoryProduct
//       categories={categories}
//       slug={slug}
//       initialProducts={products}
//     />
//   );
// };

// export default CategoryProduct;
