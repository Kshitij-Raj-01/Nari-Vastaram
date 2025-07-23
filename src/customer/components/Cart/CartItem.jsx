import React from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item, isGuest = false }) => {
  const dispatch = useDispatch();

  const product = isGuest ? item.product : item?.product;
  const size = isGuest ? item.size : item?.size;
  const quantity = isGuest ? item.quantity : item?.quantity;

  const selectedSize = product?.sizes?.find((s) => s.name === size);
  const availableQty = selectedSize?.quantity || 0;

  const handleUpdateCartItem = (num) => {
    if (isGuest) {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const updatedCart = guestCart.map((ci) =>
        ci.productId === product._id && ci.size === size
          ? { ...ci, quantity: Math.max(1, ci.quantity + num) }
          : ci
      );
      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      window.location.reload();
    } else {
      dispatch(
        updateCartItem({
          cartItemId: item._id,
          data: { quantity: quantity + num },
        })
      );
    }
  };

  const handleRemoveCartItem = () => {
    if (isGuest) {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const updatedCart = guestCart.filter(
        (ci) => !(ci.productId === product._id && ci.size === size)
      );
      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      window.location.reload();
    } else {
      dispatch(removeCartItem(item._id));
    }
  };

  return (
    <div className="p-5 shadow-lg border rounded-md bg-[#F1EDE1]">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={product?.imageUrl}
            alt={product?.title}
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{product?.title}</p>
          <p className="opacity-70">Size: {size}</p>
          <p className="opacity-70 mt-2">Seller: {product?.brand}</p>
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
            disabled={quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{quantity}</span>
          <IconButton
            sx={{ color: "blueviolet" }}
            onClick={() => handleUpdateCartItem(1)}
            disabled={quantity >= availableQty}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
          <Button onClick={handleRemoveCartItem} sx={{ color: "blueviolet" }}>
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
