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
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';

const AddAddressForm = ({ open, handleClose, handleSubmit, userId }) => {
  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: '',
    userId:''
  });
  console.log(userId)
  useEffect(() => {
    if (open) {
      setAddressData(prev => ({
        ...prev,
        firstName: '',
        lastName: '',
        userId:userId
      }));
    }
  }, [open]);

  const handleChange = (e) => {
    if (e.target.name === 'zipCode') {
      const numericValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
      setAddressData({
        ...addressData,
        [e.target.name]: numericValue
      });
      return;
    }

    if (e.target.name === 'mobile') {
      const numericValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
      setAddressData({
        ...addressData,
        [e.target.name]: numericValue
      });
      return;
    }

    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = () => {
    const submitData = {
      ...addressData,
      mobile: addressData.mobile.startsWith('+91') ? addressData.mobile : `+91${addressData.mobile}`,
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
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        bgcolor: '#F3E5F5'
      }}>
        <span style={{ 
          fontSize: '1.1rem', 
          fontWeight: 500,
          color: '#4A148C'
        }}>
          Add New Address
        </span>
        <IconButton 
          onClick={handleClose} 
          sx={{
            color: '#9C27B0',
            '&:hover': {
              color: '#4A148C'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={addressData.city}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCityIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth required>
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={addressData.state}
              onChange={handleChange}
              label="State"
              startAdornment={
                <InputAdornment position="start">
                  <LocationCityIcon color="primary" />
                </InputAdornment>
              }
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
            inputProps={{
              maxLength: 6,
              pattern: '[0-9]*'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            value={addressData.mobile}
            onChange={handleChange}
            required
            type="tel"
            inputProps={{
              maxLength: 10
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
                  +91
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button 
          onClick={handleClose}
          variant="outlined"
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '16px',
            minWidth: '100px',
            color: '#9C27B0',
            borderColor: '#9C27B0',
            '&:hover': {
              borderColor: '#7B1FA2',
              color: '#7B1FA2',
              bgcolor: 'rgba(156, 39, 176, 0.04)'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleFormSubmit} 
          variant="contained" 
          disabled={!addressData.firstName || !addressData.lastName || !addressData.streetAddress || !addressData.city || !addressData.state || !addressData.zipCode || !addressData.mobile}
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '16px',
            minWidth: '100px',
            bgcolor: '#9C27B0',
            '&:hover': {
              bgcolor: '#7B1FA2'
            },
            '&:disabled': {
              bgcolor: 'rgba(156, 39, 176, 0.12)',
              color: 'rgba(156, 39, 176, 0.26)'
            }
          }}
        >
          Save Address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAddressForm; 