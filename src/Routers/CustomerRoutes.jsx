import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../customer/Pages/HomePage/HomePage";
import Cart from "../customer/components/Cart/Cart";
import Navigation from "../customer/components/Navigation/Navigation";
import Footer from "../customer/components/Footer/Footer";
import Product from "../customer/components/Product/Product";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import { OrderDetails } from "../customer/components/Order/OrderDetails";
import { Order } from "../customer/components/Order/Order";

export const CustomerRoutes = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
      <Route path="/login" element={<HomePage />}/>
      <Route path="/register" element={<HomePage />}/>

          <Route path="/" element={<HomePage />}/>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/:lavelOne/:lavelTwo/:lavelThre" element={<Product/>}></Route>
          <Route path="/product/:productId" element={<ProductDetails/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>

          <Route path="/account/order"  element={<Order/>}></Route>
          <Route path="/account/order/:orderId"  element={<OrderDetails/>}></Route>
          
      

      {/* <Order/> */}
      {/* <OrderDetails/> */}
        
      </Routes>

      <div>
        <Footer />
      </div>
      
    </div>
  );
};
