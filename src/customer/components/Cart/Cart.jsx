import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get, removeCartItem } from "../../../State/Cart/Action";
import { getUser } from "../../../State/Auth/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cart} = useSelector(store=>store);
  const {auth} = useSelector(store=>store);
  const sortedCartItems = cart.cart?.cartItems?.slice()?.sort((a, b) => {
    return a.id - b.id;
  });

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  }

  const handleRemoveCartItem =  (itemId) => {
    try {
       dispatch(removeCartItem(itemId));

    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  useEffect(()=>{
    dispatch(get())
  
  },[cart.deleteCartItems])

 
  return (



    
    <div className="pt-10 mt-[100px]">
      
      
      {cart.cart?.cartItems?.length ? <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2 space-y-4">
          {sortedCartItems.map((item)=>(
            <CartItem 
              key={item.id} 
              item={item} 
              handleRemoveCartItem={handleRemoveCartItem}
            />
          ))}
          
          <div className="flex justify-start py-6">
            <Button 
              onClick={() => navigate("/:lavelOne/:lavelTwo/:lavelThre")}
              variant="outlined"
              startIcon={
                <svg 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
              }
              sx={{
                px: "2rem",
                py: "0.7rem",
                color: "#9155fd",
                borderColor: "#9155fd",
                "&:hover": {
                  borderColor: "#804dee",
                  backgroundColor: "rgba(145, 85, 253, 0.04)"
                }
              }}
            >
              Continue Shopping
            </Button>
          </div>
        </div>

        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-2 pt-2 pl-4">Price Details</p>
            <hr />

            <div className="space-y-3 font-semibold ml-4 mr-4">
              <div className="flex justify-between pt-3 text-black">
                <span className="opacity-70 font-semibold">Price</span>
                <span>${cart.cart?.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="opacity-70 font-semibold" >Delivery Charge</span>
                <span className="text-gray-700">Free</span>
              </div>
              <div className="flex justify-between pt-3">
                <span  className="opacity-70 font-semibold ">Discount Amount</span>
                <span className="text-red-700 ">${cart.cart?.discount}</span>
              </div>
              <hr />
              <div className="relative flex justify-between pt-3 overflow-hidden">
                <span>Total Amount</span>
                <span className="md:pl-[10rem] text-green-700  font-bold">${cart.cart?.totalDiscountedPrice}</span>
                <span className="line-through text-red-700">${cart.cart?.totalPrice}</span>

              </div>
              <hr />
              <Button
              onClick={handleCheckout}
              variant="contained"
              className="w-full h-full"
              sx={{
                px: "2rem",
                py: "0.7rem",
                bgcolor: "#9155fd",
                marginTop: "2rem",
              }}
            >
              Checkout
            </Button>
            </div>

         
          </div>
        </div>
      </div> : <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <h1 className="text-2xl font-semibold">Your Shopping Cart is Empty</h1>
        <Button 
          onClick={() => navigate("/")}
          variant="contained"
          sx={{
            px: "2rem",
            py: "0.7rem",
            bgcolor: "#9155fd",
          }}
        >
          Shop Now
        </Button>
      </div> }
    </div>
  );
};

export default Cart;
