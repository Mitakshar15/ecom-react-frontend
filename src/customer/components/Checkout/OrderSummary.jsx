import React from 'react'
import { AdressCard } from '../AdressCard/AdressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'

export const OrderSummary = () => {
  return (
    <div>
     
     <div className='p-5 shadow-lg rounded-md border'>
       <AdressCard/>
     </div>

     <div className="pt-10">
      <div className="lg:grid grid-cols-3  relative">
        <div className="col-span-2 space-y-4">
       {[1,1].map((item)=><CartItem/>) }
        </div>

        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-2 pt-2 pl-4">Price Details</p>
            <hr />

            <div className="space-y-3 font-semibold ml-4 mr-4">
              <div className="flex justify-between pt-3 text-black">
                <span className="opacity-70 font-semibold">Price</span>
                <span>$1223</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="opacity-70 font-semibold" >Delivery Charge</span>
                <span className="text-gray-700">Free</span>
              </div>
              <div className="flex justify-between pt-3">
                <span  className="opacity-70 font-semibold ">Discount Amount</span>
                <span className="text-red-700 ">$623</span>
              </div>
              <hr />
              <div className="relative flex justify-between pt-3 overflow-hidden">
                <span>Total Amount</span>
                <span className="md:pl-[10rem] text-green-700  font-bold">$600</span>
                <span className="line-through text-red-700">$1223</span>

              </div>
              <hr />
              <Button
              variant="contained"
              className="w-full h-full"
              sx={{
                px: "2rem",
                py: "0.7rem",
                bgcolor: "#9155fd",
                marginTop: "2rem",
              }}
            >
              Pay Now
            </Button>
            </div>

         
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}
