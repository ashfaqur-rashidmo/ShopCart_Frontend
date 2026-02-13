import React from "react";
import { Title } from "../Text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const CategoryList = ({ categories = [], selectedCategory, setSelectedCategory }) => {

  //  REMOVE DUPLICATES BY SLUG
  const uniqueCategories = Array.from(
    new Map(categories.map(cat => [cat.slug, cat])).values()
  );

  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Popular Categories</Title>

      <RadioGroup
        value={selectedCategory ?? ""}
        onValueChange={setSelectedCategory}
        className="mt-2 flex flex-col gap-3"
      >
        {uniqueCategories.map((category) => (
          <div
            key={category._id}
            onClick={() => setSelectedCategory(category.slug)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <RadioGroupItem value={category.slug} id={category.slug} />
            <Label
              htmlFor={category.slug}
              className={
                selectedCategory === category.slug
                  ? "font-semibold text-shop_dark_green"
                  : "font-normal"
              }
            >
              {category.title}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="text-sm font-medium mt-2 underline"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default CategoryList;
