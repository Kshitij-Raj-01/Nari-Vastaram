import { Button, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const isGuest = !auth?.user;

  const product = item.product || item;
  const sizeName = item.size || item.selectedSize || '';
  const quantity = item.quantity || 1;

  const selectedSize = product?.sizes?.find(size => size.name === sizeName);
  const availableQty = selectedSize?.quantity || 99;

  const handleUpdateCartItem = (num) => {
    if (isGuest) return; // 🛑 Prevent quantity changes for guest cart (unless implemented)
    if (!item._id) return;

    const reqData = {
      cartItemId: item._id,
      data: { quantity: quantity + num }
    };

    dispatch(updateCartItem(reqData));
  };

  const handleRemoveCartItem = () => {
    if (isGuest) {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const newCart = guestCart.filter(ci =>
        !(ci._id === item._id && ci.selectedSize === sizeName)
      );
      localStorage.setItem("guest_cart", JSON.stringify(newCart));
      window.location.reload(); // quick fix; ideally use Redux or state update
    } else {
      dispatch(removeCartItem(item._id));
    }
  };

  return (
    <div className='p-5 shadow-lg border rounded-md bg-[#F1EDE1]'>
      <div className='flex items-center'>
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className='w-full h-full object-cover object-top'
            src={product?.imageUrl}
            alt=""
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className='font-semibold'>{product?.title}</p>
          <p className='opacity-70'>Size: {sizeName}, White</p>
          <p className='opacity-70 mt-2'>Seller: {product?.brand}</p>
          <div className="flex space-x-5 items-center pt-6">
            <p className="font-semibold">₹{product?.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{product?.price}</p>
            <p className="text-green-600 font-semibold">
              {product?.discountPercent}% Off
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={quantity <= 1 || isGuest}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className='py-1 px-7 border rounded-sm'>{quantity}</span>

          <IconButton
            sx={{ color: 'blueviolet' }}
            onClick={() => handleUpdateCartItem(1)}
            disabled={quantity >= availableQty || isGuest}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <Button onClick={handleRemoveCartItem} sx={{ color: 'blueviolet' }}>
            Remove
          </Button>
        </div>
      </div>

      {quantity >= availableQty && (
        <p className="text-sm text-red-500 mt-2">
          Only {availableQty} left in stock
        </p>
      )}
    </div>
  );
};

export default CartItem;
