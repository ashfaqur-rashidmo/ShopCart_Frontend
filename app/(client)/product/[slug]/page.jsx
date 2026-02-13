import React from "react";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import AddToCartButton from "@/components/AddToCartButton";
import FavouriteButton from "@/components/FavouriteButton";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { RxBorderSplit } from "react-icons/rx";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";

const SingleProductPage = async ({ params }) => {
  const { slug } = await params; 

  let product = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/slug/${slug}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      product = data.data;
    }
  } catch (err) {
    console.error(err);
  }

  if (!product) return <div>Product not found</div>;

  const isStock = product.stock > 0;

  return (
    <Container className="flex flex-col md:flex-row gap-10 pb-10">
      {product.images && <ImageView images={product.images} isStock={product.stock} className="hover:scale-110"/>}

      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-sm text-gray-600 tracking-wide">{product.description}</p>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} size={12} className="text-shop_light_green" fill="#3b9c3c" />
            ))}
            <p className="font-semibold">(120)</p>
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-5">
          <PriceView price={product.price} discount={product.discount} className="text-lg font-bold" />
          <p
            className={`px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg ${
              isStock ? "text-green-600 bg-green-100" : "bg-red-100 text-red-600"
            }`}
          >
            {isStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div className="flex items-center gap-2.5 lg:gap-3">
          <AddToCartButton product={product} />
          <FavouriteButton showProduct={true} product={product} />
        </div>

        <ProductCharacteristics product={product} />

        {/* Extra Options */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-3">
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <RxBorderSplit className="text-lg" />
            <p>Compare colors</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FaRegQuestionCircle className="text-lg hoverEffect" />
            <p>Ask a question</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <TbTruckDelivery className="text-lg" />
            <p>Delivery & return</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FiShare2 className="text-lg" />
            <p>Share</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
            <Truck size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">Free Delivery</p>
              <p className="text-sm text-gray-500 underline underline-offset-2">
                Enter your Postal code for Delivery Availability.
              </p>
            </div>
          </div>
          <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
            <CornerDownLeft size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">Return Delivery</p>
              <p className="text-sm text-gray-500">
                Free 30days Delivery Returns.{" "}
                <span className="underline underline-offset-2">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
