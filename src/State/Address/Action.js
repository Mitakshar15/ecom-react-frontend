import apiConfig from "../../config/apiConfig";
import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS } from "./ActionType";

export const addAddress = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ADDRESS_REQUEST });

    try {
        const res = await apiConfig.post('/api/users/address/edit', reqData);
        dispatch({ type: ADD_ADDRESS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: ADD_ADDRESS_FAILURE, payload: error.message });
    }


}