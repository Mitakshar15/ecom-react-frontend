import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'



const steps=[
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
]

export const OrderTracker = ({activeStep}) => {
  return (
    <div className='w-full'>
            <div>
            <Stepper activeStep={activeStep} alternativeLabel>
         
         {steps.map((label)=><Step>
            <StepLabel sx={{color:"#9155FD",fontSize:"20px"}}>
                {label}
            </StepLabel>
         </Step>)}

        </Stepper>

            </div> 
       
    </div>
  )
}
