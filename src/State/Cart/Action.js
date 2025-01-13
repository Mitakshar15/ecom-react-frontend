import apiConfig, { api } from "../../config/apiConfig";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_ALL_CART_ITEM_FAILURE,
  REMOVE_ALL_CART_ITEM_REQUEST,
  REMOVE_ALL_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const get = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });

  try {
    const { data } = await apiConfig.get(`/v1/user/cart`);
    console.log("INSIDE GET CART",data.data)
    dispatch({ type: GET_CART_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  try {
    const { data } = await apiConfig.put("/v1/user/cart/add", reqData);
    console.log("INSID ADD ITM TO CART ACTION",data)
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const removeCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });

  try {
    const { data } = await apiConfig.delete(`/v1/user/cart/item/remove/${reqData}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });

  try {
    const { data } = await apiConfig.put(
      `/v1/user/cart/item/${reqData.cartItemId}/${reqData.data.quantity}`,
      reqData.data
    );
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};

export const removeAllCartItem = (reqData) => async (dispatch) => {
  dispatch({type: REMOVE_ALL_CART_ITEM_REQUEST});
  try {
    const {data} = await apiConfig.delete(`/api/cart_items/removeAllItem/${reqData}`);
    dispatch({type: REMOVE_ALL_CART_ITEM_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: REMOVE_ALL_CART_ITEM_FAILURE, payload: error.message});
  }
}