import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  Grid, 
  Typography, 
  Paper,
  Divider,
  Avatar,
  Container,
  Card,
  CardContent,
  IconButton,
  Stack,
  Badge,
  Chip,
  Pagination
} from '@mui/material';
import {
  Edit,
  LocationOn,
  Phone,
  Email,
  CalendarToday,
  Add,
  ShoppingBag,
  ShoppingCart,
  LocalShipping,
  Inventory,
  RemoveShoppingCart
} from '@mui/icons-material';
import AddressCard from './AddressCard';
import { getUser } from '../../../State/Auth/Action';
import { OrderCard } from '../Order/OrderCard';
import { getOrderHistory } from '../../../State/Order/Action';
import { get } from '../../../State/Cart/Action';
import EditProfileForm from './EditProfileForm';
import { editUser } from '../../../State/Auth/Action';
import { Link, useNavigate } from 'react-router-dom';
import AddAddressForm from './AddAddressForm';
import { addAddress } from '../../../State/Address/Action';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const { orders } = useSelector(store => store.order);
  const { cart } = useSelector(store => store.cart);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [addressUpdated, setAddressUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(jwt) {
      dispatch(getUser(jwt));
      dispatch(getOrderHistory());
      dispatch(get());
    }
    if (addressUpdated) {
      setAddressUpdated(false);
    }
  }, [dispatch, addressUpdated]);

  const sortedOrders = orders?.slice()?.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleBagClick = () => {
    navigate('/account/order');
  }
  const handleCartClick = () => {
    navigate('/cart');
  }

  const handleEditClick = () => {
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };

  const handleEditSubmit = (formData) => {
    dispatch(editUser(formData));
  };

  const handleAddAddressClick = () => {
    setOpenAddressForm(true);
  };

  const handleCloseAddressForm = () => {
    setOpenAddressForm(false);
  
  };

  const handleAddressSubmit = (addressData) => {
    dispatch(addAddress(addressData));
    handleCloseAddressForm();
    setAddressUpdated(true);
  };

  const handleAddressUpdate = () => {
    setAddressUpdated(true);
  };

  return (
    <div className='pt-[2rem]'>
    <Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
      {/* Updated Profile Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #f8fafd 0%, #eef2f7 100%)',
          borderRadius: '20px',
          p: 4,
          mb: 4,
          color: '#1e4b9c',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(40, 116, 240, 0.05) 0%, rgba(40, 116, 240, 0) 70%)',
            borderRadius: '50%',
            transform: 'translate(50%, -50%)'
          }}
        />
        
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Avatar sx={{ 
                  width: 22, 
                  height: 22, 
                  bgcolor: '#47bd66',
                  border: '2px solid #ffffff',
                }}>
                  ✓
                </Avatar>
              }
            >
              <Avatar
                sx={{ 
                  width: 100, 
                  height: 100,
                  bgcolor: '#1e4b9c',
                  border: '4px solid #ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  fontSize: '2.5rem',
                  color: '#ffffff'
                }}
              >
                {auth.user?.firstName?.[0]}{auth.user?.lastName?.[0]}
              </Avatar>
            </Badge>
          </Grid>
          <Grid item xs>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" fontWeight="bold">
                {auth.user?.firstName} {auth.user?.lastName}
              </Typography>
              <IconButton 
                onClick={handleEditClick}
                sx={{ 
                  bgcolor: 'rgba(30, 75, 156, 0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(30, 75, 156, 0.2)',
                  color: '#1e4b9c',
                  p: 1,
                  width: 35,
                  height: 35,
                  '&:hover': { 
                    bgcolor: 'rgba(30, 75, 156, 0.2)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s ease-in-out'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Edit sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
            <Stack direction="row" spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" />
                <Typography>{auth.user?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography>{auth.user?.mobile || 'Not provided'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday fontSize="small" />
                <Typography>Member since {new Date(auth.user?.createdAt).getFullYear()}</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Quick Stats Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          {[
            { icon: <ShoppingBag onClick={handleBagClick} />, label: 'Total Orders', value: orders?.length || 0 },
            { icon: <LocalShipping />, label: 'In Transit', value: orders?.filter(o => o.orderStatus === 'SHIPPED')?.length || 0 },
            { icon: <ShoppingCart onClick={handleCartClick} />, label: 'Cart Items', value: cart?.cartItems?.length || 0 },
            { icon: <Inventory />, label: 'Delivered', value: orders?.filter(o => o.orderStatus === 'DELIVERED')?.length || 0 }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.light' }}>{stat.icon}</Avatar>
                <Box>
                  <Typography color="textSecondary" variant="body2">{stat.label}</Typography>
                  <Typography variant="h6" fontWeight="bold">{stat.value}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Stack spacing={4}>
            {/* Account Overview */}
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShoppingBag /> Account Overview
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                  <Box>
                    <Typography color="textSecondary" variant="subtitle2">Account Status</Typography>
                    <Chip 
                      label="Active" 
                      color="success" 
                      size="small" 
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                  <Box>
                    <Typography color="textSecondary" variant="subtitle2">Cart Value</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ₹{cart?.totalPrice || 0}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="textSecondary" variant="subtitle2">Saved Addresses</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {auth.user?.addresses?.length || 0}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Cart Summary */}
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShoppingCart /> Shopping Cart
                  </Typography>
                  <Chip 
                    label={`${cart?.cartItems?.length || 0} items`}
                    color="primary" 
                    size="small"
                  />
                </Box>
                <Divider sx={{ mb: 2 }} />
                {cart?.cartItems?.length > 0 ? (
                  <Stack spacing={2}>
                    {cart?.cartItems?.slice(0, 3).map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={item.product?.imageUrl} variant="rounded" />
                        <Box flex={1}>
                          <Typography variant="body2" noWrap>{item.product?.title}</Typography>
                          <Typography variant="subtitle2" color="primary">₹{item.price} × {item.quantity}</Typography>
                        </Box>
                      </Box>
                    ))}
                    {cart?.cartItems?.length > 3 && (
                      <Button variant="outlined" fullWidth>
                        View All Items
                      </Button>
                    )}
                  </Stack>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    py: 3,
                    gap: 1
                  }}>
                    <RemoveShoppingCart 
                      sx={{ 
                        fontSize: 40,
                        color: 'text.secondary',
                        opacity: 0.3
                      }} 
                    />
                    <Typography color="text.secondary" variant="body1">
                      Your cart is empty
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Address Section */}
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn /> Delivery Addresses
                  </Typography>
                  <IconButton color="primary" onClick={handleAddAddressClick}>
                    <Add />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Stack 
                  spacing={2} 
                  sx={{ 
                    maxHeight: '300px', 
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#888',
                      borderRadius: '10px',
                      '&:hover': {
                        background: '#555',
                      },
                    },
                    pr: 1 // Add padding for scrollbar
                  }}
                >
                  {auth.user?.addresses?.map((address, index) => (
                    <AddressCard 
                      key={index} 
                      address={{
                        ...address,
                        id: address._id || address.id
                      }}
                      onUpdate={handleAddressUpdate}
                    />
                  ))}
                  {auth.user?.addresses?.length === 0 && (
                    <Typography color="text.secondary" textAlign="center" py={2}>
                      No addresses added yet
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column - Orders */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Recent Orders
                </Typography>
                <Chip 
                  label={`${orders?.length || 0} orders`}
                  color="primary" 
                  size="small"
                />
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={2} id="orders-section">
                {sortedOrders?.slice(0, 3).map((order, index) => (
                  <OrderCard key={order._id || index} order={order} />
                ))}
                {sortedOrders?.length > 0 ? (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    mt: 2,
                    pt: 2,
                    borderTop: 1,
                    borderColor: 'divider'
                  }}>
                    <Button
                      component={Link}
                      to="/account/order"
                      color="primary"
                      sx={{
                        textTransform: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      View full order history
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body1" textAlign="center" color="text.secondary">
                    No orders found
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <EditProfileForm
        open={openEditForm}
        handleClose={handleCloseEditForm}
        userData={auth.user}
        handleSubmit={handleEditSubmit}
      />
      <AddAddressForm
        open={openAddressForm}
        handleClose={handleCloseAddressForm}
        handleSubmit={handleAddressSubmit}
        userId={auth.user?.id}
      />
    </Container>
    </div>
  );
};

export default UserProfile;
