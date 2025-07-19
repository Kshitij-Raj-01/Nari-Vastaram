import { Button, IconButton } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleUpdateCartItem = (num) => {
        const cartItemId = item._id;
        if (!cartItemId) {
            console.error("Cart item ID is missing!");
            return;
        }

        const reqData = {
            cartItemId,
            data: { quantity: item.quantity + num }
        };

        dispatch(updateCartItem(reqData));
    };

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item._id));
    };

    // 💡 Get available quantity for this item's selected size
    const selectedSize = item?.product?.sizes?.find(size => size.name === item?.size);
    const availableQty = selectedSize?.quantity || 0;

    return (
        <div className='p-5 shadow-lg border rounded-md bg-[#F1EDE1]'>
            <div className='flex items-center'>
                <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                    <img
                        className='w-full h-full object-cover object-top'
                        src={item?.product?.imageUrl}
                        alt=""
                    />
                </div>

                <div className="ml-5 space-y-1">
                    <p className='font-semibold'>{item?.product?.title}</p>
                    <p className='opacity-70'>Size: {item?.size}, White</p>
                    <p className='opacity-70 mt-2'>Seller: {item?.product?.brand}</p>
                    <div className="flex space-x-5 items-center pt-6">
                        <p className="font-semibold">₹{item?.discountedPrice}</p>
                        <p className="opacity-50 line-through">₹{item?.price}</p>
                        <p className="text-green-600 font-semibold">
                            {item?.product?.discountPercent}% Off
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className="flex items-center space-x-2">
                    <IconButton
                        onClick={() => handleUpdateCartItem(-1)}
                        disabled={item.quantity <= 1}
                    >
                        <RemoveCircleOutlineIcon />
                    </IconButton>

                    <span className='py-1 px-7 border rounded-sm'>{item.quantity}</span>

                    <IconButton
                        sx={{ color: 'blueviolet' }}
                        onClick={() => handleUpdateCartItem(1)}
                        disabled={item.quantity >= availableQty}
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

            {/* 💬 Show stock warning */}
            {item.quantity >= availableQty && (
                <p className="text-sm text-red-500 mt-2">
                    Only {availableQty} left in stock
                </p>
            )}
        </div>
    );
};

export default CartItem;
