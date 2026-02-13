"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import dayjs from "dayjs"
import { Calendar } from "lucide-react"
import Loader from "@/components/Loader"


const HomePage = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllBlogs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
, { cache: "no-store" })
      const data = await res.json()
      setBlogs(data.data || [])
    } catch (err) {
      console.error(err)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllBlogs()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  if (!blogs.length) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No blogs available
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Our Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="group rounded-xl overflow-hidden border border-transparent hover:border-shop_dark_green transition-all duration-300 bg-white"
          >
            <Link href={`/blog/${blog.slug}`}>
              <Image
                src={blog.mainImage}
                alt={blog.title}
                width={600}
                height={400}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-2">
                {blog.blogCategories?.map((cat, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold text-shop_dark_green bg-shop_light_green/10 px-2 py-1 rounded"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <p className="flex items-center gap-1 text-xs text-lightColor mb-2">
                <Calendar size={14} />
                {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
              </p>

              <Link
                href={`/blog/${blog.slug}`}
                className="block text-lg font-semibold leading-snug hover:text-shop_dark_green transition-colors line-clamp-2"
              >
                {blog.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
