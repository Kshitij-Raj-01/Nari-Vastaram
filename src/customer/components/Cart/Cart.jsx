import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import { api } from "../../../config/apiConfig";
import AuthModal from "../../Auth/AuthModal";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, auth } = useSelector((store) => store);
  const [OpenAuthModal, setOpenAuthModal] = useState(false);
  const [guestCartItems, setGuestCartItems] = useState([]);
  const [guestCartTotals, setGuestCartTotals] = useState({
    totalPrice: 0,
    totalDiscountedPrice: 0,
    discounts: 0,
  });

    const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleCheckout = () => {
    if(auth.user){
      navigate("/checkout?step=2");
    } else{
      handleOpen();
    }
  };

  const calculateGuestCartTotals = (items) => {
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let discounts = 0;

    for (const item of items) {
      const price = item.product?.price || 0;
      const discounted = item.product?.discountedPrice || 0;
      const quantity = item.quantity || 1;

      totalPrice += price * quantity;
      totalDiscountedPrice += discounted * quantity;
      discounts += (price - discounted) * quantity;
    }

    return { totalPrice, totalDiscountedPrice, discounts };
  };

  useEffect(() => {
    if (auth.user) {
      dispatch(getCart());
    } else {
      const guestItems = JSON.parse(localStorage.getItem("guest_cart")) || [];

      Promise.all(
        guestItems.map(async (item) => {
          try {
            const res = await api.get(`/api/products/id/${item.productId}`);
            return {
              ...item,
              product: res.data,
            };
          } catch (err) {
            console.error("Error fetching product", err);
            return null;
          }
        })
      ).then((items) => {
        const filtered = items.filter((i) => i !== null);
        setGuestCartItems(filtered);
        setGuestCartTotals(calculateGuestCartTotals(filtered));
      });
    }
  }, [auth.user]);

  const displayItems = auth.user ? cart.cart?.cartItems || [] : guestCartItems;
  const totals = auth.user
    ? {
        totalPrice: cart.cart?.totalPrice || 0,
        totalDiscountedPrice: cart.cart?.totalDiscountedPrice || 0,
        discounts: cart.cart?.discounts || 0,
      }
    : guestCartTotals;

  return (
    <div className="lg:grid grid-cols-3 lg:px-16 relative">
      <div className="col-span-2 space-y-5">
        {displayItems.length > 0 ? (
          displayItems.map((item, index) => (
            <CartItem key={index} item={item} isGuest={!auth.user} />
          ))
        ) : (
          <p className="text-center p-10 text-gray-600 italic">
            Your cart is empty... add a little love 🛒💖
          </p>
        )}
      </div>

      <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
        <div className="border p-5 bg-[#F1EDE1]">
          <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
          <div className="space-y-3 font-semibold mb-10">
            <div className="flex justify-between pt-3 text-black">
              <span>Price</span>
              <span>₹{totals.totalPrice}</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Discount</span>
              <span className="text-green-600">- ₹{totals.discounts}</span>
            </div>
            <div className="flex justify-between pt-3 text-black">
              <span>Delivery Charges</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr />
            <div className="flex justify-between pt-3 text-black font-bold">
              <span>Total Amount</span>
              <span className="text-green-600">₹{totals.totalDiscountedPrice}</span>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            variant="contained"
            className="w-full mt-5"
            sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
