import axios from "axios";
import {
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "./ActionType";
import apiConfig, { api } from "../../config/apiConfig";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({type: CREATE_ORDER_REQUEST})
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    
    const { data } = await apiConfig.post(
      `/v1/user/order/create`,
      reqData.address,
     
    );
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    console.log("created order - ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error : ", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:
        error.message
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {


    const { data } = await apiConfig.get(
      `/api/orders/${orderId}`,
      
    );
    console.log("order by id ", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch ",error)
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload:
        error.message,
    });
  }
};

export const getOrderHistory = (reqData) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST });
      

    const { data } = await apiConfig.get(`/api/orders/user`);
    console.log("order history -------- ", data);
    dispatch({
      type: GET_ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_HISTORY_FAILURE,
      payload:
        error.message
    });
  }
};

export const confirmOrder = (orderId) => async (dispatch) => {
dispatch({type: CONFIRM_ORDER_REQUEST});
 try {
  const   {data} = await apiConfig.put(`/api/admin/orders/${orderId}/confirmed`);

  console.log("confirm order ", data);
  
  dispatch({
    type: CONFIRM_ORDER_SUCCESS,
    payload: data,
  })
 } catch (error) {
  dispatch({
    type: CONFIRM_ORDER_FAILURE,
    payload: error.message,
  })
 }
  


  

}

export const placeOrder = (orderId) => async (dispatch) => {
  dispatch({type: PLACE_ORDER_REQUEST});
   try {
    const   {data} = await apiConfig.put(`/api/admin/orders/${orderId}/placed`);
  
    console.log("Place order ", data);
    
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data,
    })
   } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      payload: error.message,
    })
   }
    
  
  
    
  
  }