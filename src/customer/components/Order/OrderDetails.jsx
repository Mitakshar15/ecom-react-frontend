import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { OrderTracker } from './OrderTracker'
import { Box, Grid, Modal, Rating, Button, TextField } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { getOrderById } from '../../../State/Order/Action'
import { addReview } from '../../../State/Reviews/Action'

export const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order } = useSelector((store) => store.order);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

  const handleOpenReviewModal = (item) => {
    setSelectedItem(item);
    setOpenReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);
    setSelectedItem(null);
    setRating(0);
    setReview('');
  };

  const handleSubmitReview = () => {
    const reviewData = {
      productId: selectedItem.product.id,
      rating: rating,
      review: review
    };
    dispatch(addReview(reviewData));
    handleCloseReviewModal();
  };

  return (
    <div className='px-5 lg:px-20 mt-[120px]'>
      {order ? (
        <>
          <div className='py-10 border rounded-md'>
            <OrderTracker 
              activeStep={
                order.orderStatus === "DELIVERED" ? 3 : 
                order.orderStatus === "SHIPPED" ? 2 : 
                order.orderStatus === "CONFIRMED" ? 1 : 0
              } 
            />
          </div>

          {/* New Delivery and Price Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
            {/* Delivery Address */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border">
              <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
              <div className="space-y-3">
                <p className="font-medium text-gray-700">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.streetAddress},
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">Phone: {order.shippingAddress.mobile}</p>
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-white rounded-lg shadow-md p-6 border h-fit">
              <h2 className="text-lg font-semibold mb-4">Price Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Price ({order.orderItemList?.length} items)</span>
                  <span>₹{order.totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="text-green-600">- ₹{order.totalPrice - order.totalDiscountedPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{order.totalDiscountedPrice}</span>
                  </div>
                </div>
                <div className="border-t pt-3 mt-3">
                  <p className="text-green-600 font-medium">
                    You saved ₹{order.totalPrice - order.totalDiscountedPrice} on this order
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Section Title */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Order Items</h2>

          <Grid className='space-y-5 py-5' container>
            {order.orderItemList?.map((item) => (
              <Grid 
                item 
                container 
                className='shadow-xl rounded-md p-5 border' 
                sx={{ alignItems: "center", justifyContent: "space-between" }}
                key={item._id}
              >
                <Grid item xs={6}>
                  <div className='flex items-center space-x-4'>
                    <img 
                      className='w-[5rem] h-[5rem] object-cover object-top' 
                      src={item.product?.imageUrl} 
                      alt={item.product?.title} 
                    />
                    <div className='space-y-2 ml-5'>
                      <p className='font-semibold'>{item.product?.title}</p>
                      <p className='space-x-5 opacity-50 text-xs font-semibold'>
                        <span>Color: {item.color}</span>
                        <span>Size: {item.size}</span>
                      </p>
                      <p>Seller: {item.product?.brand}</p>
                      <p>₹{item.discountedPrice}</p>
                    </div>
                  </div>
                </Grid>

                <Grid item>
                  <Box 
                    sx={{ color: deepPurple[500], cursor: 'pointer' }}
                    onClick={() => handleOpenReviewModal(item)}
                  >
                    <StarBorderIcon sx={{ fontSize: "3rem" }} className='px-2' />
                    <span>Rate & Review Product</span>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>

          {/* Review Modal */}
          <Modal
            open={openReviewModal}
            onClose={handleCloseReviewModal}
            aria-labelledby="review-modal"
            aria-describedby="review-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}>
              <h2 className="text-xl font-semibold mb-4">Rate & Review</h2>
              {selectedItem && (
                <div className="mb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      className="w-20 h-20 object-cover object-top"
                      src={selectedItem.product?.imageUrl}
                      alt={selectedItem.product?.title}
                    />
                    <div>
                      <p className="font-semibold">{selectedItem.product?.title}</p>
                      <p className="text-sm text-gray-500">{selectedItem.product?.brand}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="mb-2">Rating</p>
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                      size="large"
                    />
                  </div>
                  
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Write your review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="mb-4"
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button onClick={handleCloseReviewModal} variant="outlined">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitReview} 
                      variant="contained" 
                      disabled={!rating || !review}
                      sx={{ bgcolor: deepPurple[500], '&:hover': { bgcolor: deepPurple[700] } }}
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
              )}
            </Box>
          </Modal>
        </>
      ) : (
        <div className="h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  )
}
