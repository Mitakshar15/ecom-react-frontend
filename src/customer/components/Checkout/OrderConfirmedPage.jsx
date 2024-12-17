import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderConfirmedPage = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };
  const handleGoToOrderDetails = () => {
    navigate('/account/order');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          bgcolor: 'white',
          padding: '3rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: '5rem',
            color: '#4CAF50',
            marginBottom: '1rem',
          }}
        />
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Order Confirmed!
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your order has been successfully placed.
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          You will receive an email confirmation with your order details shortly.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGoToOrderDetails}
          sx={{
            marginTop: '2rem',
            padding: '0.8rem 2rem',
            borderRadius: '25px',
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          View your orders
        </Button>
      </Box>
    </Box>
  );
};

export default OrderConfirmedPage;
