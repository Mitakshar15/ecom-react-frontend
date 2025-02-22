import apiConfig from "../../config/apiConfig";
import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, DELETE_ADDRESS_BY_ID_FAILURE, DELETE_ADDRESS_BY_ID_REQUEST, DELETE_ADDRESS_BY_ID_SUCCESS, EDIT_ADDRESS_FAILURE, EDIT_ADDRESS_REQUEST, EDIT_ADDRESS_SUCCESS, GET_USER_ADDRESS_FAILURE, GET_USER_ADDRESS_REQUEST, GET_USER_ADDRESS_SUCCESS } from "./ActionType";

export const addAddress = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ADDRESS_REQUEST });

    try {
        const res = await apiConfig.post('/v1/user/address/add',reqData);
        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: ADD_ADDRESS_FAILURE, payload: error.message });
    }


}

export const deleteAddressById = (addressId) => async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_BY_ID_REQUEST });

    try {
        const res = await apiConfig.delete(`/api/users/address/delete/${addressId}`);
        dispatch({ type: DELETE_ADDRESS_BY_ID_SUCCESS , payload: res.data });
    } catch (error) {
        dispatch({ type: DELETE_ADDRESS_BY_ID_FAILURE, payload: error.message });
    }
}

export const editAddress = (reqData,addressId) => async (dispatch) => {
    dispatch({ type: EDIT_ADDRESS_REQUEST });

    try {
        const res = await apiConfig.put(`/v1/user/address/edit/${addressId}`, reqData);
        dispatch({ type: EDIT_ADDRESS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: EDIT_ADDRESS_FAILURE, payload: error.message });
    }
}

export const getUserAddress = () => async (dispatch) => {
    dispatch({ type: GET_USER_ADDRESS_REQUEST });

    try {
        const res = await apiConfig.get('/v1/user/address');
        dispatch({ type: GET_USER_ADDRESS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_USER_ADDRESS_FAILURE, payload: error.message });
    }
}