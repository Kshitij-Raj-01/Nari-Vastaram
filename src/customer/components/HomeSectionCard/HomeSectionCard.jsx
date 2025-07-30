import React from "react";
import { useNavigate } from "react-router-dom";

function HomeSectionCard({ product }) {
  const navigate = useNavigate();
  const isSoldOut = product.quantity === 0;

  return (
    <div
      onClick={() => !isSoldOut && navigate(`/product/${product?._id}`)}
      className="py-3 mb-2 cursor-pointer flex flex-col items-center bg-[#e9c794dc] rounded-lg shadow-md overflow-hidden w-[15rem] sm:w-[9rem] md:w-[12rem] lg:w-[15rem] mx-auto h-[24rem] relative"
    >
      {/* Image Container */}
      <div className="h-[18rem] w-full relative">
        <img
          className={`object-cover object-top w-full h-full ${isSoldOut ? 'opacity-60' : ''}`}
          src={product.imageUrl}
          alt={product.title}
        />

        {/* Discount Percent Tag */}
        {!isSoldOut && product.discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-md z-10">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <p className="text-white text-md md:text-lg font-bold tracking-wide">
              Sold Out
            </p>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 text-center flex-grow flex flex-col justify-between">
        <h3 className="text-xs md:text-base font-semibold text-gray-900 line-clamp-1">
          {product.brand}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 line-clamp-1">
          {product.title}
        </p>
        {/* Pricing Below Title */}
        {!isSoldOut && (
          <div className="mt-1">
            <span className="text-sm font-bold text-green">
              ₹{product.discountedPrice}
            </span>{" "}
            <span className="text-xs line-through text-red ml-1">
              ₹{product.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeSectionCard;
