import React from 'react'
import { Title } from '../Text'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const BrandList = ({ brands = [], selectedBrands, setSelectedBrands }) => {
  return (
    <div className='w-full bg-white p-5'>
      <Title className="text-base font-black">Brands</Title>
      
      <RadioGroup
        value={selectedBrands || ""}
        onValueChange={setSelectedBrands}
        className="mt-2 space-y-1"
      >
        {Array.isArray(brands) && brands.map((brand) => (
          <div key={brand._id || brand.slug} className='flex items-center space-x-2 cursor-pointer'>
            <RadioGroupItem value={brand.slug} id={brand.slug} className="rounded-sm" />
            <Label htmlFor={brand.slug} className={selectedBrands === brand.slug ? "font-semibold text-shop_dark_green" : "font-normal"}>
              {brand.name}
            </Label>
          </div>
        ))}

        {selectedBrands && (
          <button
            onClick={() => setSelectedBrands(null)}
            className='text-sm font-medium mt-2 underline underline-offset-2 hover:text-shop_dark_green text-left'
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  )
}

export default BrandList
