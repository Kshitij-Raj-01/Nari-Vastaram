import React from 'react'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const navigate = useNavigate();

  // 🌿 Check if available
  const isAvailable = product?.sizes?.some(size => size.quantity > 0);

  return (
    <div
      onClick={() => isAvailable && navigate(`/product/${product?._id}`)}
      className={`relative productCard w-[18rem] m-4 transition-all cursor-pointer ${
        !isAvailable ? 'opacity-60 pointer-events-none' : ''
      }`}
    >
      <div className='h-[20rem] relative'>
        <img
          className='h-full w-full object-cover object-left-top'
          src={product.imageUrl}
          alt={product.title}
        />
        {!isAvailable && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded-full shadow-md">
            Sold Out
          </div>
        )}
      </div>
      <div className="textPart bg-[#e9c794dc] p-3">
        <div>
          <p className='font-bold opacity-60'>{product.brand}</p>
          <p className='text-clamp-1'>{product.title}</p>
        </div>
        <div className='flex items-center space-x-2'>
          <p className='font-semibold'>₹{product.discountedPrice}</p>
          <p className='line-through opacity-50'>₹{product.price}</p>
          <p className='text-green-600 font-semibold'>{product.discountPercent}%</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
