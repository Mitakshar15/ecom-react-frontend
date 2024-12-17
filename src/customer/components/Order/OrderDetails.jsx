import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { OrderTracker } from './OrderTracker'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getOrderById } from '../../../State/Order/Action'

export const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order } = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId, dispatch]);

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
                  <Box sx={{ color: deepPurple[500] }}>
                    <StarBorderIcon sx={{ fontSize: "3rem" }} className='px-2' />
                    <span>Rate & Review Product</span>
                  </Box>
                </Grid>
              </Grid>
            ))}

            <div className="flex justify-end mt-4 border-t pt-4">
              <p className="font-bold text-xl">
                Total Amount: ₹{order?.totalDiscountedPrice}
              </p>
            </div>
          </Grid>
        </>
      ) : (
        <div className="h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  )
}
