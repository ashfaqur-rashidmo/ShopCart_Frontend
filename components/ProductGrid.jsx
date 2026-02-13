// "use client"

// import { AnimatePresence, motion } from "motion/react"
// import { LoaderCircle } from "lucide-react"
// import NoProductAvailable from "./NoProductAvailable"
// import ProductCard from "./ProductCard"
// import HomeTabBar from "./HomeTabBar"
// import { useState, useEffect } from "react"
// import Loader from "./Loader"

// const ProductGrid = ({ products: externalProducts, showTabBar = true }) => {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedTab, setSelectedTab] = useState("Gadget Accessories")

//   // 🔹 Only fetch when products not passed from parent
//   useEffect(() => {
//     if (externalProducts) {
//       setProducts(externalProducts)
//       setLoading(false)
//       return
//     }

//     const fetchProducts = async () => {
//       setLoading(true)
//       try {
//         const res = await fetch("http://localhost:5000/api/products", {
//           cache: "no-store",
//         })
//         const json = await res.json()
//         setProducts(json.data || [])
//       } catch (err) {
//         console.error(err)
//         setProducts([])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [externalProducts])

//   const filteredProducts =
//     showTabBar && selectedTab !== "All"
//       ? products.filter(p => p.categoryID?.title === selectedTab)

//       : products

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-10">
//         <Loader />
//       </div>
//     )
//   }    

//   return (
//     <div>
      
//       {showTabBar && (
//         <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
//       )}

//       {loading ? (
//         <div className="flex items-center justify-center py-10">
//           <Loader className="animate-spin text-blue-500" />
//         </div>
//       ) : filteredProducts.length ? (
//         <AnimatePresence>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
//             {filteredProducts.map(product => (
//               <motion.div
//                 key={product._id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//               >
//                 <ProductCard product={product} />
//               </motion.div>
//             ))}
//           </div>
//         </AnimatePresence>
//       ) : (
//         <NoProductAvailable />
//       )}
//     </div>
//   )
// }

// export default ProductGrid


"use client"

import { AnimatePresence, motion } from "motion/react"
import NoProductAvailable from "./NoProductAvailable"
import ProductCard from "./ProductCard"
import HomeTabBar from "./HomeTabBar"
import { useState, useEffect } from "react"
import Loader from "./Loader"

const ProductGrid = ({ products: externalProducts, showTabBar = true }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("Gadget Accessories")

  useEffect(() => {
    if (externalProducts) {
      setProducts(externalProducts)
      setLoading(false)
      return
    }

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:5000/api/products", { cache: "no-store" })
        const json = await res.json()
        setProducts(json.data || [])
      } catch (err) {
        console.error(err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [externalProducts])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader />
      </div>
    )
  }

  // Only calculate filteredProducts after loading
  const filteredProducts =
    showTabBar && selectedTab !== "All"
      ? products.filter(p => p.categoryID?.title === selectedTab)
      : products

  return (
    <div>
      {showTabBar && (
        <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      )}

      {filteredProducts.length > 0 ? (
        <AnimatePresence>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {filteredProducts.map(product => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      ) : (
        <NoProductAvailable />
      )}
    </div>
  )
}

export default ProductGrid
