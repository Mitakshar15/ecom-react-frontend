import { Box, Button, Grid, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdressCard } from "../AdressCard/AdressCard";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {auth} = useSelector(store => store);
  const [deliveryAddress, setDeliveryAddress] = useState({
    firstName: "Mitakshar",
    lastName: "Hegde",
    address: "Somanalli, Targod post, Sirsi, 581402",
    zipCode: "581402",
    mobile: "9989098763",
    city: "Sirsi",
    state: "Karnataka",
    
  });
  console.log("INSIDE ADDRESS",auth);
  const addresses = auth.user?.addresses;
  console.log("ADDRESS ADDRESS ",addresses)
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressList, setShowAddressList] = useState(true);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setShowAddressList(true);
    } else {
      setShowAddressList(false);
    }
  }, [addresses,dispatch]);

  const handleAddressSelect = (selectedAddress) => {
    setDeliveryAddress({
      firstName: selectedAddress.firstName,
      lastName: selectedAddress.lastName,
      address: selectedAddress.address,
      city: selectedAddress.city,
      state: selectedAddress.state,
      zipCode: selectedAddress.zipCode,
      mobile: selectedAddress.mobile,
    });
    setSelectedAddressId(selectedAddress.id);
    setShowAddressList(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    const newAddress = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      address: data.get('address'),
      city: data.get('city'),
      state: data.get('state'),
      zipCode: data.get('zipCode'),
      mobile: data.get('phoneNumber'),
    };
    
    setDeliveryAddress(newAddress);
    setShowAddressList(false);
  };

  const handleDeliverySubmit = () => {
    const orderData = {
      address: deliveryAddress,
      navigate
    };
    dispatch(createOrder(orderData));
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll mt-[30px]"
        >
          {showAddressList ? (
            <div className="p-5">
              <Typography variant="h6" gutterBottom>
                {addresses && addresses.length > 0 
                  ? "Choose Delivery Address"
                  : "No Saved Addresses"
                }
              </Typography>
              {addresses && addresses.length > 0 ? (
                addresses.map((addr) => (
                  <div 
                    key={addr.id} 
                    className="border p-3 mb-4 cursor-pointer hover:border-primary"
                    onClick={() => handleAddressSelect(addr)}
                  >
                    <AdressCard address={addr} />
                  </div>
                ))
              ) : (
                <Typography color="text.secondary" className="mt-2">
                  You have no addresses saved. Please add a new address.
                </Typography>
              )}
            </div>
          ) : (
            <div className="p-5 py-7 cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6">
                  Delivery Address
                </Typography>
                {addresses && addresses.length > 0 && (
                  <Button 
                    variant="text" 
                    onClick={() => setShowAddressList(true)}
                  >
                    Change
                  </Button>
                )}
              </div>
              <AdressCard address={deliveryAddress}/>
              <Button
                sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                size="large"
                variant="contained"
                onClick={handleDeliverySubmit}
                fullWidth
              >
                Deliver Here
              </Button>
            </div>
          )}
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <Typography variant="h6" gutterBottom>
              Add New Address
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-Address"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="given-Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip / Postal Code"
                    fullWidth
                    autoComplete="shipping-postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-Number"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{py:2, mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Save
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
