import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  Box,
  InputAdornment
} from '@mui/material';
import { 
  Close,
  Person,
  Email,
  Phone,
  Save,
  Cancel
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const EditProfileForm = ({ open, handleClose, userData, handleSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        mobile: userData.mobile ? userData.mobile.replace('+91', '') : '',
        id: userData.id || ''
      });
    }
  }, [userData, open]);

  const handleChange = (e) => {
    if (e.target.name === 'mobile') {
      const value = e.target.value.replace(/[^0-9]/g, '');
      if (value.length <= 10) {
        setFormData({
          ...formData,
          mobile: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    handleSubmit({
      ...formData,
      mobile: formData.mobile ? `+91${formData.mobile}` : '',
      jwt: token,
      userId: userData.id
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
          boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        bgcolor: '#EDE7F6',
        color: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: '#D1C4E9'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 500,
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Person sx={{ fontSize: '1.2rem', color: '#4527A0' }} />
          Edit Profile
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size="small"
          sx={{
            color: '#5E35B1',
            '&:hover': { 
              bgcolor: 'rgba(94, 53, 177, 0.08)',
              transform: 'rotate(90deg)',
              transition: 'all 0.2s ease'
            }
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#4527A0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    '&:hover': {
                      borderColor: '#CE93D8',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 1px rgba(186, 104, 200, 0.15)',
                      borderColor: '#AB47BC',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#9C27B0'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    '&:hover': {
                      borderColor: theme => alpha(theme.palette.secondary.main, 0.5),
                    },
                    '&.Mui-focused': {
                      boxShadow: theme => `0 0 0 1px ${alpha(theme.palette.secondary.main, 0.05)}`,
                      borderColor: theme => alpha(theme.palette.secondary.main, 0.6),
                    }
                  }
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#4527A0' }} />
                  </InputAdornment>
                ),
                sx: { 
                  bgcolor: 'transparent',
                  '&:hover': { cursor: 'not-allowed' },
                  '& input': {
                    color: '#000000',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderStyle: 'dashed',
                    borderColor: '#CE93D8',
                  }
                }
              }}
              helperText={
                <Typography variant="caption" sx={{ 
                  color: 'red',
                  fontSize: '0.7rem',
                  fontStyle: 'italic'
                }}>
                  Email cannot be changed
                </Typography>
              }
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme => alpha(theme.palette.secondary.main, 0.3),
                  }
                }
              }}
            />

            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Phone sx={{ color: '#4527A0' }} />
                      <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>+91</Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  '&:hover': {
                    borderColor: '#CE93D8',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 0 0 1px rgba(186, 104, 200, 0.15)',
                    borderColor: '#AB47BC',
                  }
                }
              }}
              placeholder="Enter 10 digit mobile number"
              inputProps={{
                maxLength: 10,
                pattern: '[0-9]*'
              }}
              helperText={
                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                  Please enter a 10-digit mobile number
                </Typography>
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ 
          p: 2.5, 
          pt: 1.5,
          gap: 1,
          borderTop: '1px solid',
          borderColor: '#F3E5F5'
        }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{ 
              borderRadius: '6px',
              px: 2,
              py: 0.75,
              textTransform: 'none',
              fontWeight: 500,
              borderWidth: '1px',
              borderColor: '#B39DDB',
              color: '#5E35B1',
              '&:hover': {
                borderColor: '#9575CD',
                bgcolor: '#EDE7F6',
                borderWidth: '1px'
              }
            }}
            startIcon={<Cancel fontSize="small" sx={{ color: '#4527A0' }} />}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{ 
              borderRadius: '6px',
              px: 2,
              py: 0.75,
              textTransform: 'none',
              fontWeight: 500,
              bgcolor: '#5E35B1',
              boxShadow: '0 2px 8px rgba(94, 53, 177, 0.15)',
              '&:hover': {
                bgcolor: '#4527A0',
                boxShadow: '0 4px 12px rgba(94, 53, 177, 0.2)'
              }
            }}
            startIcon={<Save fontSize="small" />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProfileForm; 