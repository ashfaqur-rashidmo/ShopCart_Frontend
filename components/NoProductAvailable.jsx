import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function NoProductAvailable() {
  return (
    <div className="w-full flex justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full"
      >
        <Card className="rounded-2xl shadow-md p-6 text-center">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="p-6 rounded-full bg-gray-100 w-fit">
              <ShoppingCart className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-semibold tracking-wide">No Products Available</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We couldn’t find any products at the moment. Please check back later
              or explore other categories.
            </p>
            
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
