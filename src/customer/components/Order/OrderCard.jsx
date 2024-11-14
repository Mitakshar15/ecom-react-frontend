import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

export const OrderCard = () => {

  const navigate = useNavigate();

  return (
    <div onClick={()=> navigate(`/account/order/${5}`)} className='p-5 shadow-md shadow-black-50 hover:shadow-2xl border' >
        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
            
         <Grid item xs={6}>

         <div className="flex cursor-pointer">
                <img className="w-[5rem] h-[5rem] object-cover object-top" src="data:image/webp;base64,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" alt="" />
                <div className="ml-5 space-y-2">

                   <p className="">Mens Slim rise Black jeans</p>
                   <p className="opacity-50 text-xs font-semibold">Size: M</p>
                   <p className="opacity-50 text-xs font-semibold">Color: Black</p>
                </div>
            </div>
         </Grid>

         <Grid item xs={2}>
               <p>$1999</p>
         </Grid>
            
            <Grid item xs={4}>
              {true&&    <div>
                <p>
                <AdjustIcon sx={{width:"15px", height:"15px"}} className='text-green-600 mr-2 text-sm'/>
                <span>
                    Delivered On March 03
                </span>
 
               </p>
               <p className='text-sm'>Your Item has Been Delivered</p>
              </div>}
             
               { false && <p>
                <AdjustIcon sx={{width:"15px", height:"15px"}} className='text-gray-600 mr-2 text-sm'/>
                <span>
                    Expected Delivery On March 03
                </span>
               </p>}
            </Grid>

        </Grid>
    </div>
  )
}
