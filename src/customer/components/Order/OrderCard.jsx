import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

export const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  // Format the delivery date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div onClick={() => navigate(`/account/order/${order?.id}`)} className='p-5 shadow-md shadow-black-50 hover:shadow-2xl border'>
      <p className="font-bold text-lg mb-2">Order ID: {order?.id}</p>
      
      {order?.orderItemList?.map((item) => (
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }} key={item._id} className="mb-4">
          <Grid item xs={6}>
            <div className="flex cursor-pointer">
              <img
                className="w-[5rem] h-[5rem] object-cover object-top"
                src={item.product?.imageUrl}
                alt={item.product?.title}
              />
              <div className="ml-5 space-y-2">
                <p className="font-semibold">{item.product?.title}</p>
                <p className="opacity-50 text-xs font-semibold">Size: {item.size}</p>
                <p className="opacity-50 text-xs font-semibold">Quantity: {item.quantity}</p>
                <p className="opacity-50 text-xs font-semibold">Price: ₹{item.discountedPrice}</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={2}>
            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </Grid>

          <Grid item xs={4}>
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className={`${order.orderStatus === 'DELIVERED' ? 'text-green-600' : 'text-gray-600'} mr-2 text-sm`}
                />
                <span>
                  {order.orderStatus === 'DELIVERED'
                    ? `Delivered on ${formatDate(order.deliveryDate)}`
                    : `Expected Delivery on ${formatDate(order.expectedDeliveryDate)}`
                  }
                </span>
              </p>
              <p className='text-sm'>
                {order.orderStatus === 'DELIVERED'
                  ? 'Your Item Has Been Delivered'
                  : `Order Status: ${order.orderStatus}`
                }
              </p>
            </div>
          </Grid>
        </Grid>
      ))}
      
      <div className="flex justify-end mt-4 border-t pt-4">
        <p className="font-bold">Total Amount: ₹{order?.totalDiscountedPrice}</p>
      </div>
    </div>
  );
};
