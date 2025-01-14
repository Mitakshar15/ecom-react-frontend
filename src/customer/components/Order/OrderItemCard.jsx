import React from "react";
import { useNavigate } from "react-router-dom";

const OrderItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/product/${item.product.id}`)} 
      className="flex gap-4 border rounded-md p-3 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="w-[8rem] h-[8rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={item.product.imageUrl}
          alt={item.product.title}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div>
          <p className="font-bold opacity-60">{item.product.brand}</p>
          <p className="font-medium text-lg">{item.product.title}</p>
          
          <div className="flex items-center space-x-3 mt-2">
            <p className="font-semibold">${item.price}</p>
            <p className="line-through opacity-50">${item.product?.price}</p>
            <p className="text-green-600 font-semibold">{item.product?.discountPersent}% off</p>
          </div>
          
          <p className="text-gray-600 mt-2">Quantity: {item.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard; 