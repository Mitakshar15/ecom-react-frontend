import { type } from "@testing-library/user-event/dist/type";
import { FIND_PRODUCT_BY_ID_REQEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";
import apiConfig from "../../config/apiConfig";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST })
  
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  try {
    const { data } = await apiConfig.get(
      `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    console.log("Product Data",data);
    dispatch({type: FIND_PRODUCTS_SUCCESS,payload:data})
  } catch (error) {
    dispatch({type: FIND_PRODUCTS_FAILURE,payload:error.message})
  }
};




export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQEST })

  const { productId } = reqData;
  try {
    const {data} = apiConfig.get(`/api/products/id/${productId}`)
    dispatch({type: FIND_PRODUCT_BY_ID_SUCCESS,payload:data})
  } catch (error) {
    dispatch({type: FIND_PRODUCTS_FAILURE,payload:error.message})
  }
};


