import React, { useEffect } from 'react'
import { AdressCard } from '../AdressCard/AdressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, getOrderById } from '../../../State/Order/Action'
import { useLocation, useNavigate } from 'react-router-dom'
import { removeAllCartItem } from '../../../State/Cart/Action'

export const OrderSummary = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');
  const{order}  = useSelector(store=>store);
  const navigate = useNavigate();
  const {cart} = useSelector(store=>store);
  const handleConfirmOrder = () => {
    dispatch(confirmOrder(order.order.id))
    dispatch(removeAllCartItem(cart.cart?.id))
    navigate("/orderConfirmed")
  }
 useEffect(()=>{

  dispatch(getOrderById(orderId));
 },[orderId])


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Order Summary</h1>
        <div className='bg-white p-6 shadow-md rounded-lg border border-gray-200'>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Address</h2>
          <AdressCard address={order.order?.shippingAddress} />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="col-span-2 space-y-4">
          <div className="bg-white p-6  rounded-lg border">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.order?.orderItemList?.map((item) => <CartItem key={item.id} item={item} />)}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Price Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price</span>
                <span className="text-gray-900 font-medium">${order.order?.totalPrice}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount</span>
                <span className="text-red-600 font-medium">-${order.order?.discount}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">$600</div>
                    <div className="text-sm text-gray-500 line-through">${order.order?.totalPrice}</div>
                  </div>
                </div>
              </div>

              <Button
                variant="contained"
                fullWidth
                onClick={handleConfirmOrder}
                sx={{
                  py: "0.8rem",
                  mt: "1.5rem",
                  bgcolor: "#9155fd",
                  '&:hover': {
                    bgcolor: "#804dee"
                  },
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
