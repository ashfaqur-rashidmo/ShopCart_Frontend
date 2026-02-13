"use client"

import Image from "next/image"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ImageView = ({ images = [], isStock }) => {
  const [active, setActive] = useState(0)

  if (!images.length) return null

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <Image
            key={active}
            src={images[active]} 
            alt={`Product image ${active + 1}`}
            width={700}
            height={700}
            priority
            className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain rounded-md transition-transform duration-300 hover:scale-110 cursor-pointer ${
              isStock === 0 ? "opacity-50" : ""
            }`}
          />
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-6 gap-2 h-20 md:h-24">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`border border-muted overflow-hidden ${
              active === index ? "ring-1 border-darkColor/30" : ""
            }`}
          >
            <Image
              src={img} // ✅ MongoDB image URL
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageView
