'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Container from './Container'
import CategoryList from './shop/CategoryList'
import BrandList from './shop/BrandList'
import PriceRange from './shop/PriceRange'
import ProductGrid from './ProductGrid'
import Loader from './Loader'

const Shop = ({ categories = [] }) => {
  const searchParams = useSearchParams()
  const brandFromUrl = searchParams.get("brand")

  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState(null)

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' })
        const data = await res.json()
        setAllProducts(data.data || [])
      } catch (err) {
        console.error(err)
        setAllProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  //  Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/brands', { cache: 'no-store' })
        const data = await res.json()
        setBrands(data.data || [])
      } catch (err) {
        console.error(err)
        setBrands([])
      }
    }
    fetchBrands()
  }, [])

  //  URL brand
  useEffect(() => {
    if (brandFromUrl) setSelectedBrand(brandFromUrl)
  }, [brandFromUrl])

  //  Filter products
  useEffect(() => {
    let result = [...allProducts]

    if (selectedCategory)
      result = result.filter(p => p.categoryID?.slug === selectedCategory)

    if (selectedBrand)
      result = result.filter(p => p.brandslug === selectedBrand)

    if (selectedPrice) {
      const [min, max] = selectedPrice.split('-').map(Number)
      result = result.filter(p => p.price >= min && p.price <= max)
    }

    setFilteredProducts(result)
  }, [selectedCategory, selectedBrand, selectedPrice, allProducts])

  return (
    <Container>
      <div className="flex gap-6 h-[calc(100vh-140px)]">
        
        <aside className="w-64 overflow-y-auto border-r pr-2">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <BrandList
            brands={brands}
            selectedBrands={selectedBrand}
            setSelectedBrands={setSelectedBrand}
          />

          <PriceRange
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </aside>

       
        <section className="flex-1 overflow-y-auto relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <ProductGrid products={filteredProducts} showTabBar={false} />
          )}
        </section>
      </div>
    </Container>
  )
}

export default Shop
