"use client";

import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      pinCode: data.get("postal"),
      mobile: data.get("phoneNumber"),
    };

    navigate("/order/summary", { state: { address } });
  };

  const handleDeliverToExistingAddress = (address, index) => {
    setSelectedAddressIndex(index);
    navigate("/order/summary", { state: { address } });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Saved Addresses</h1>
      <div className="space-y-3 mb-10">
        {auth.user?.addresses?.map((address, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-md border ${selectedAddressIndex === index ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'} p-4 shadow-md`}
            onClick={() => handleDeliverToExistingAddress(address, index)}
          >
            <AddressCard address={address} />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Box className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <TextField fullWidth name="firstName" label="First Name" required />
            <TextField fullWidth name="lastName" label="Last Name" required />
          </div>
          <TextField fullWidth name="address" label="Address" required />
          <div className="grid grid-cols-2 gap-5">
            <TextField fullWidth name="city" label="City" required />
            <TextField fullWidth name="state" label="State" required />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <TextField fullWidth name="postal" label="Postal Code" required />
            <TextField fullWidth name="phoneNumber" label="Phone Number" required />
          </div>
          <Button type="submit" variant="contained" sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}>
            Deliver to this Address
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default DeliveryAddressForm;
