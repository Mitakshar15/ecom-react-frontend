import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

const AddAddressForm = ({ open, handleClose, handleSubmit, userId }) => {
  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: ''
  });

  useEffect(() => {
    if (open) {
      setAddressData(prev => ({
        ...prev,
        firstName: '',
        lastName: ''
      }));
    }
  }, [open]);

  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = () => {
    const submitData = {
      ...addressData,
      userId
    };
    handleSubmit(submitData);
    
    setAddressData({
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      mobile: ''
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Address</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={addressData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={addressData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Street Address"
            name="streetAddress"
            value={addressData.streetAddress}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={addressData.city}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth required>
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={addressData.state}
              onChange={handleChange}
              label="State"
            >
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="Gujarat">Gujarat</MenuItem>
              <MenuItem value="West Bengal">West Bengal</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="ZIP Code"
            name="zipCode"
            value={addressData.zipCode}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            value={addressData.mobile}
            onChange={handleChange}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleFormSubmit} 
          variant="contained" 
          color="primary"
          disabled={!addressData.firstName || !addressData.lastName || !addressData.streetAddress || !addressData.city || !addressData.state || !addressData.zipCode || !addressData.mobile}
        >
          Save Address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAddressForm; 