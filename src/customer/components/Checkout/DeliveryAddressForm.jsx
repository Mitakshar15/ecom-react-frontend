import { Box, Button, Grid, Typography, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdressCard } from "../AdressCard/AdressCard";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// Import icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { addAddress, getUserAddress } from "../../../State/Address/Action";


const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {auth} = useSelector(store => store);
  const {address} = useSelector(store => store.address);
  const [deliveryAddress, setDeliveryAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    zipCode: "",
    mobile: "",
    city: "",
    state: "",
  });

  const addresses = address.data || [];
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressList, setShowAddressList] = useState(true);

  const handleAddressSelect = (selectedAddress) => {
    setDeliveryAddress({
      firstName: selectedAddress.firstName,
      lastName: selectedAddress.lastName,
      streetAddress: selectedAddress.streetAddress,
      city: selectedAddress.city,
      state: selectedAddress.state,
      zipCode: selectedAddress.zipCode,
      mobile: selectedAddress.mobile,
    });
    setSelectedAddressId(selectedAddress.id);
    setShowAddressList(false);
  };
  useEffect(() => {
    dispatch(getUserAddress());
   }, [showAddressList]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    const newAddress = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      streetAddress: data.get('streetAddress'),
      city: data.get('city'),
      state: data.get('state'),
      zipCode: data.get('zipCode'),
      mobile: data.get('phoneNumber'),
      userId: auth.user.id,
    };
    
    setDeliveryAddress(newAddress);
    setShowAddressList(false);
    dispatch(addAddress(newAddress));
    // Here you would typically dispatch an action to save the address to backend
    // dispatch(saveAddress(newAddress));
    
    e.target.reset();
  };

  const handleDeliverySubmit = () => {
    const orderData = {
      address: deliveryAddress,
      navigate
    };
    dispatch(createOrder(orderData));
  };

  const renderAddressSection = () => {
    if (showAddressList) {
      return (
        <div className="p-5">
          <Typography variant="h6" gutterBottom>
            {address?.data?.length > 0 ? "Choose Delivery Address" : "No Saved Addresses"}
          </Typography>
          
          {address?.data?.length > 0 ? (
            address?.data?.map((addr) => (
              <div 
                key={addr.id} 
                className="border p-3 mb-4 cursor-pointer hover:border-primary"
                onClick={() => handleAddressSelect(addr)}
              >
                <AdressCard address={addr} />
              </div>
            ))
          ) : (
            <div>
              <Typography color="text.secondary" className="mt-2">
                You have no saved addresses. Please add a new address using the form.
              </Typography>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="p-5 py-7 cursor-pointer">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6">
            Delivery Address
          </Typography>
          <Button 
            variant="text" 
            onClick={() => setShowAddressList(true)}
          >
            Change
          </Button>
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
    );
  };

  // Add Indian states list
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Add validation for postal code
  const handlePostalCodeChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    event.target.value = value;
  };

  return (
    <div className="max-w-7xl mx-auto p-3 bg-gray-50">
      <Grid container spacing={3}>
        {/* Left Section - Address List */}
        <Grid
          item
          xs={12}
          lg={5}
        >
          <Box className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="border-b border-gray-100 bg-white p-4">
              <Typography variant="h6" className="flex items-center gap-2 text-gray-700">
                <LocalShippingOutlinedIcon className="text-primary" />
                Saved Delivery Addresses
              </Typography>
            </div>
            <div className="max-h-[475px] overflow-y-auto">
              {renderAddressSection()}
            </div>
          </Box>
        </Grid>

        {/* Right Section - Add New Address Form */}
        <Grid item xs={12} lg={7}>
          <Box className="bg-white rounded-lg shadow-md border border-gray-100">
            <div className="border-b border-gray-100 p-4">
              <Typography variant="h6" className="flex items-center gap-2 text-gray-700">
                <HomeOutlinedIcon className="text-primary" />
                Add New Delivery Address
              </Typography>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              {/* Personal Details Section */}
              <div className="mb-4">
                <Typography variant="subtitle2" className="flex items-center gap-2 mb-3 text-gray-600">
                  <PersonOutlineIcon className="text-primary" />
                  Personal Details
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      fullWidth
                      variant="outlined"
                      size="medium"
                      className="bg-gray-50/30"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      variant="outlined"
                      size="medium"
                      className="bg-gray-50/30"
                    />
                  </Grid>
                </Grid>
              </div>

              {/* Address Details Section */}
              <div className="mb-4">
                <Typography variant="subtitle2" className="flex items-center gap-2 mb-3 text-gray-600">
                  <LocationOnOutlinedIcon className="text-primary" />
                  Address Details
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="streetAddress"
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      className="bg-gray-50/30"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      className="bg-gray-50/30"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="state"
                      name="state"
                      label="State"
                      select
                      fullWidth
                      defaultValue=""
                      variant="outlined"
                      className="bg-gray-50/30"
                    >
                      {indianStates.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="zipCode"
                      name="zipCode"
                      label="Postal Code"
                      fullWidth
                      variant="outlined"
                      className="bg-gray-50/30"
                      inputProps={{ 
                        maxLength: 6,
                        pattern: "[0-9]*",
                        inputMode: "numeric"
                      }}
                      onChange={handlePostalCodeChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <PhoneInput
                      country={'in'}
                      value={deliveryAddress.mobile}
                      onChange={phone => setDeliveryAddress({...deliveryAddress, mobile: phone})}
                      inputProps={{
                        required: true,
                        name: 'phoneNumber'
                      }}
                      containerClass="!w-full"
                      inputClass="!w-full !h-[56px] !bg-gray-50/30 !text-gray-900 !text-base !border-gray-200"
                      buttonClass="!bg-gray-50/30 !border-gray-200"
                    />
                  </Grid>
                </Grid>
              </div>

              {/* Action Button */}
              <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "RGB(145 85 253)",
                    py: 1.5,
                    '&:hover': {
                      bgcolor: "RGB(135 75 243)"
                    }
                  }}
                >
                  Save Address
                </Button>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
