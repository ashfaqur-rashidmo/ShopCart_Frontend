"use client"

import React, { useEffect, useState } from "react"
import Container from "@/components/Container"
import ProductCard from "@/components/ProductCard"
import { Title } from "@/components/Text"
import Link from "next/link"
import Loader from "@/components/Loader"

const Dealpage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:5000/api/products/hot", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch hot products")
        const { data } = await res.json()
        setProducts(data || [])
      } catch (err) {
        console.error(err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchHotProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No hot deals available
      </div>
    )
  }

  return (
    <div className="py-10 bg-deal_bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide text-2xl text-center">
          Hot Deals of the week
        </Title>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products.map((product) => (
            
              <ProductCard key={product._id} product={product} />
            
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Dealpage
