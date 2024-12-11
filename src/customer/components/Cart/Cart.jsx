import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../../State/Cart/Action";
const Cart = () => {

 const navigate = useNavigate();
 const dispatch = useDispatch();
 const {cart} = useSelector(store=>store);
 const handleCheckout = () => {
   navigate("/checkout?step=2");
 }

 useEffect(()=>{
  dispatch(get())
 },[])



  return (
    <div className="pt-10">
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2 space-y-4">
       {cart.cart?.cartItems.map((item)=><CartItem item={item} />) }
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
      </div>
    </div>
  );
};

export default Cart;
