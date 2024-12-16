import React, { useEffect, useState } from 'react'
import { AdressCard } from '../AdressCard/AdressCard'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, getOrderById, placeOrder } from '../../../State/Order/Action'
import { useLocation, useNavigate } from 'react-router-dom'
import { removeAllCartItem } from '../../../State/Cart/Action'
import OrderItemCard from '../Order/OrderItemCard'

export const OrderSummary = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');
  const { order } = useSelector(store => store);
  const navigate = useNavigate();
  const { cart } = useSelector(store => store);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId))
        .catch(err => {
          setError("Failed to load order details. Please try again.");
          console.error("Error loading order:", err);
        });
    } else {
      setError("No order ID found");
    }
  }, [orderId, dispatch]);

  const handleConfirmOrder = () => {
    dispatch(placeOrder(order.order.id))
    dispatch(removeAllCartItem(cart.cart?.id))
    navigate("/orderConfirmed")
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[80vh] flex items-center justify-center">
          <div className="text-2xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!order.order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[80vh] flex items-center justify-center">
          <div className="text-2xl text-gray-600">Loading order details...</div>
        </div>
      </div>
    );
  }

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
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.order?.orderItemList?.map((item) => (
                <OrderItemCard key={item.id} item={item} />
              ))}
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
