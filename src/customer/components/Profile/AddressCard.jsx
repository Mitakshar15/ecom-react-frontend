import React from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AddressCard = ({ address }) => {
  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 2,
        position: 'relative',
        '&:hover': { boxShadow: 3 }
      }}
    >
      <Box sx={{ pr: 8 }}>
        <Typography variant="subtitle1" gutterBottom>
          {address.firstName} {address.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address.streetAddress}</Typography>
        <Typography variant="body2" color="text.secondary">
          {address.street} {address.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address.state}, {address.zipCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {address.mobile}
        </Typography>
      </Box>
      
      <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
        <IconButton size="small" onClick={() => {/* Add edit handler */}}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => {/* Add delete handler */}}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default AddressCard; 