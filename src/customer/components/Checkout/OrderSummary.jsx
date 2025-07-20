"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { Button } from "@mui/material";

const OrderSummary = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((store) => store);
  const { address } = location.state || {};
  const [orderCreated, setOrderCreated] = useState(false);

  const handlePlaceOrder = () => {
    if (orderCreated || !address || cart.cartItems.length === 0) return;

    setOrderCreated(true);
    dispatch(createOrder({ address, navigate }));
  };

  useEffect(() => {
    if (!address) {
      navigate("/checkout?step=1");
    }
  }, [address, navigate]);

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Order Summary
      </h2>

      <div className="mb-6 p-4 border rounded-md shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Delivery Address</h3>
        <p className="text-gray-600">
          {address?.firstName} {address?.lastName}, {address?.streetAddress},<br />
          {address?.city}, {address?.state} - {address?.pinCode}<br />
          Phone: {address?.mobile}
        </p>
      </div>

      <div className="mb-6 p-4 border rounded-md shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Items in Cart</h3>
        {cart?.cartItems?.map((item, index) => (
          <div key={index} className="mb-2 text-gray-700">
            {item.product?.title} — {item.size} × {item.quantity}
          </div>
        ))}
      </div>

      <div className="text-right">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#9155fd",
            px: "2rem",
            py: ".6rem",
            "&:hover": {
              bgcolor: "#7a44f3",
            },
          }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
