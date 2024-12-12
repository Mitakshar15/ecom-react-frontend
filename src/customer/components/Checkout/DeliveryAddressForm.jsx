import { Box, Button, Grid, Grid2 } from "@mui/material";
import React from "react";
import { AdressCard } from "../AdressCard/AdressCard";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
const DeliveryAddressForm = () => {

 const dispatch = useDispatch();
 const navigate = useNavigate();
const address =  {
  firstName: "Mitakshar",
  lastName: "Hegde",
  streetAddress: "Somanalli, Targod post, Sirsi, 581402",
  zipCode: "581402",
  mobile: "9989098763",
}

 const handleSubmit=(e) => {
    e.preventDefault();
    console.log("adress");
    const data = new FormData(e.currentTarget);
    const address ={
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        address: data.get('address'),
        city: data.get('city'),
        state: data.get('state'),
        zipCode: data.get('zipCode'),
        mobile: data.get('phoneNumber'),
      };
    
      const orderData = {address,navigate}
      dispatch(createOrder(orderData));
    console.log(orderData);
 }


  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll mt-[30px]"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            <AdressCard address={address}/>
            {/* <Button
              sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
              size="large"
              variant="contained"
            >
              Deliver Here
            </Button> */}
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
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
