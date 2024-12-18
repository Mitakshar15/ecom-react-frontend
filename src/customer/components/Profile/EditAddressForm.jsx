import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch, useSelector } from 'react-redux';
import { editAddress } from '../../../State/Address/Action';

const EditAddressForm = ({ open, handleClose, address, onUpdate }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: '',
    userId: ''
  });

  const formatPhoneNumber = (phone) => {
    // Remove country code if exists
    return phone.startsWith('+91') ? phone.slice(3) : phone;
  };

  React.useEffect(() => {
    if (address && auth.user) {
      setFormData({
        firstName: address.firstName || '',
        lastName: address.lastName || '',
        streetAddress: address.streetAddress || '',
        street: address.street || '',
        city: address.city || '',
        state: address.state || '',
        zipCode: address.zipCode || '',
        mobile: formatPhoneNumber(address.mobile) || '',
        userId: auth.user._id
      });
    }
  }, [address, auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Add ZIP code validation
    if (name === 'zipCode') {
      // Only allow numbers and limit to 6 digits
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      return;
    }

    // Add phone number validation
    if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      mobile: formData.mobile.startsWith('+91') ? formData.mobile : `+91${formData.mobile}`,
      userId: auth.user.id
    };
    dispatch(editAddress(submitData, address.id))
      .then(() => {
        handleClose();
        onUpdate();
      });
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
        m: 0, 
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
          Edit Delivery Address
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
      <DialogContent dividers sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
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
                value={formData.lastName}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="streetAddress"
                value={formData.streetAddress}
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={formData.zipCode}
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
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
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                sx={{ 
                  mt: 2,
                  height: '48px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '16px',
                  bgcolor: '#9C27B0',
                  '&:hover': {
                    bgcolor: '#7B1FA2'
                  }
                }}
              >
                Update Address
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressForm; 