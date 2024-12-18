import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import EditAddressForm from './EditAddressForm';

const AddressCard = ({ address, onUpdate }) => {
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleEditClick = () => {
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };

  return (
    <>
      <Paper 
        elevation={0}
        sx={{ 
          p: 2.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': { 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transform: 'translateY(-2px)'
          }
        }}
      >
        {/* Header with name and actions */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1.5
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon color="primary" sx={{ fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight="600">
              {address.firstName} {address.lastName}
            </Typography>
          </Box>
          <Box>
            <IconButton 
              size="small" 
              onClick={handleEditClick}
              sx={{ 
                color: 'primary.main',
                '&:hover': { 
                  backgroundColor: 'primary.lighter',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <EditIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Address Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
            <LocationOnIcon 
              color="primary" 
              sx={{ 
                fontSize: 20,
                mt: 0.3
              }} 
            />
            <Box>
              <Typography variant="body2">
                {address.streetAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {address.street} {address.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {address.state}, {address.zipCode}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PhoneIcon 
              color="primary" 
              sx={{ fontSize: 20 }} 
            />
            <Typography variant="body2" color="text.secondary">
              {address.mobile}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <EditAddressForm
        open={openEditForm}
        handleClose={handleCloseEditForm}
        address={address}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default AddressCard; 