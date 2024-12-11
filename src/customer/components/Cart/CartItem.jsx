import React, { useEffect } from "react";
import {Button, IconButton} from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItem, get } from "../../../State/Cart/Action";
const CartItem = ({item, handleRemoveCartItem}) => {
const dispatch = useDispatch();
const {cart} = useSelector(store=>store);
  const handleRemove = () => {
    handleRemoveCartItem(item.id);
  }

  const handleUpdateCartItem = async (num) => {
    try {
      const data = {data:{quantity:item.quantity+num}, cartItemId:item?.id}
      await dispatch(updateCartItem(data));
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }
  useEffect(()=>{
    dispatch(get());
  },[cart.UpdateCartItems])

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={item.product.imageUrl}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product.title}</p>
          <p className="opacity-70">size: {item.size || 'All size'} , color: {item.product.color}</p>
          <p className="opacity-70 mt-2">seller : {item.product.brand}</p>

          <div className="flex space-x-2 items-center pt-3">
            <p className="font-semibold text-lg">${item.discountedPrice}</p>
            <p className="opacity-50 line-through">${item.price}</p>
            <p className="text-green-600 font-semibold">{item.discountPercent}% off</p>
          </div>
        </div>




      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">

<div className="flex items-center space-x-2">
    <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={item.quantity <= 1} >
       <RemoveCircleOutlineIcon/>
    </IconButton>
    <span className="py-1 px-7 border rounded-sm">{item.quantity} </span>
    <IconButton sx={{color:"RGB(145 85 253)"}} onClick={()=>handleUpdateCartItem(1)} disabled={item.quantity >= item.product.quantity} > 
       <AddCircleOutlineIcon/>
    </IconButton>

</div>
    

<div className="flex text-sm lg:text-base mt-5 lg:mt-0" >
<Button onClick={handleRemove} sx={{color:"RGB(145 85 253)"}}>remove</Button>
</div>

</div>
    </div>
  );
};

export default CartItem;
