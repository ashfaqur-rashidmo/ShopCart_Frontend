import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 gap-4">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-shop_light_green rounded-full animate-spin"></div>
      <span className="text-gray-700 text-lg font-medium">Loading...</span>
    </div>
  );
};

export default Loader;
