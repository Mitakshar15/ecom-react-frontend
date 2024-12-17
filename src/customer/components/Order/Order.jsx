import { Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrderCard } from "./OrderCard";
import { getOrderHistory } from "../../../State/Order/Action";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const orderStatus = [
  { lable: "On the Way", value: "on_the_way" },
  { lable: "Delivered", value: "delivered" },
  { lable: "Canceled", value: "canceled" },
  { lable: "Returned", value: "returned" },
];

const ORDERS_PER_PAGE = 8;

export const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector(store => store.order);
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  // Sort orders by date and slice for pagination
  const sortedOrders = orders?.slice()?.sort((a, b) => {
    return new Date(b.orderDate) - new Date(a.orderDate);
  });

  // Calculate pagination
  const totalPages = Math.ceil((sortedOrders?.length || 0) / ORDERS_PER_PAGE);
  const startIndex = (page - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;
  const currentOrders = sortedOrders?.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-20 mt-[150px]">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.lable}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        <Grid item xs={9}>
          <div className="min-h-[80vh] bg-white rounded-lg shadow-md">
            {!orders || orders.length === 0 ? (
              <div className="h-[80vh] flex flex-col items-center justify-center p-8 max-h-[35rem]">
                <div className="bg-[#f5f5f5] rounded-full p-6 mb-4">
                  <ShoppingBagIcon sx={{ fontSize: 40 }} className="text-[#9155FD]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No Orders Yet
                </h2>
                <p className="text-gray-600 text-center mb-8 max-w-md">
                  Looks like you haven't made your choice yet. Browse our collection and find something you'll love!
                </p>
                <button 
                  onClick={() => navigate('/')} 
                  className="bg-[#9155FD] text-white px-8 py-3 rounded-md font-semibold 
                  hover:bg-[#804DFF] transition-all duration-300 
                  transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="p-5 space-y-5">
                {currentOrders.map((order) => (
                  <OrderCard key={order.id} order={order}/>
                ))}
                
                <div className={`flex justify-center py-8 ${orders.length <= ORDERS_PER_PAGE ? 'mt-auto' : ''}`}>
                  {totalPages > 1 ? (
                    <Pagination 
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      size="large"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          color: '#9155FD',
                          fontSize: '1rem',
                          fontWeight: '500',
                        },
                        '& .Mui-selected': {
                          backgroundColor: '#9155FD !important',
                          color: 'white !important',
                        },
                        '& .MuiPaginationItem-root:hover': {
                          backgroundColor: '#f3f0ff',
                        },
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    />
                  ) : (
                    // Spacer for single page
                    <div className="h-16"></div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
