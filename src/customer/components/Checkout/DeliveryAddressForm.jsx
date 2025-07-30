import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action"; 

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(store=>store.auth);
  console.log("auth : ",auth.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName : data.get("firstName"),
      lastName : data.get('lastName'),
      streetAddress : data.get('address'),
      city : data.get('city'),
      state : data.get('state'),
      pinCode : data.get('postal'),
      mobile : data.get('phoneNumber')
    }
    const orderData = {address, navigate}
    console.log("Address : ", address)
    dispatch(createOrder(orderData));
  }

  const handleDeliverToExistingAddress = (address) => {
    const orderData = { address, navigate };
    console.log("Using saved address:", address);
    dispatch(createOrder(orderData));
  };
  
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item sx={{ width: { lg: "40%" } }} className="border rounded-e-md shadow-md h-[30.5rem] w-full overflow-y-scroll bg-[#F1EDE1]">
          <div className="p-5 py-7 border-b cursor-pointer">
            {auth.user?.address.map((item)=> <div className="bg-[#FFFFFF] p-5 mb-5"> <AddressCard address={item} />
            <Button
              sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
              size="large"
              variant="contained"
              onClick={() => handleDeliverToExistingAddress(item)}
            >
              Deliver Here
            </Button></div>)}
          </div>
        </Grid>

        <Grid item xs={12} lg={7} sx={{ width: { lg: "50%" }}} >
          <Box className="border rounded-s-md shadow-md p-5 bg-[#F1EDE1]">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} sx={{ width: { lg: "45%" }, bgcolor: 'white' }}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ width: { lg: "45%" }, bgcolor: 'white' }}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sx={{ width: { lg: "93%" }, bgcolor: 'white' }}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sx={{ width: { lg: "45%" }, bgcolor: 'white' }}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sx={{ width: { lg: "45%" }, bgcolor: 'white' }}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sx={{ width: { lg: "45%" }, bgcolor: 'white' }}>
                  <TextField
                    required
                    id="postal"
                    name="postal"
                    label="Postal Code"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sx={{ width: { lg: "45%" }, bgcolor: 'white' }}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                <Button
              sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }}
              size="large"
              variant="contained"
              type="submit"
            >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
