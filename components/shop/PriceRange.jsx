'use client'
import React from "react"
import { Title } from "../Text"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

const price_ranges = [
  { label: "$1000 - $5000", value: "1000-5000" },
  { label: "$5000 - $5500", value: "5000-5500" },
  { label: "$5500 - $6500", value: "5500-6500" },
  { label: "$6500 - $7000", value: "6500-7000" },
  { label: "$7000 - $15000", value: "7000-15000" },
  { label: "$15000 - $65000", value: "15000-65000" },
  { label: "$65000 - $180000", value: "65000-180000" },
]

const PriceRange = ({ selectedPrice, setSelectedPrice }) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Price</Title>

      <RadioGroup
        value={selectedPrice || ""}
        onValueChange={setSelectedPrice}
        className="mt-3 flex flex-col gap-3"
      >
        {price_ranges.map((range) => (
          <div
            key={range.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <RadioGroupItem
              value={range.value}
              id={range.value}
            />
            <Label
              htmlFor={range.value}
              className={
                selectedPrice === range.value
                  ? "font-semibold text-shop_dark_green cursor-pointer"
                  : "font-normal cursor-pointer"
              }
            >
              {range.label}
            </Label>
          </div>
        ))}

        {selectedPrice && (
          <button
            onClick={() => setSelectedPrice(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 hover:text-shop_dark_green text-left"
          >
            Reset Price
          </button>
        )}
      </RadioGroup>
    </div>
  )
}

export default PriceRange


