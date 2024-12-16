import { ADD_RATING_REQUEST, ADD_RATING_SUCCESS, ADD_RATING_FAILURE } from "./ActionType";
import axios from "axios";
import apiConfig, { api } from "../../config/apiConfig";

// Action Creator to add a rating
export const addRating = (productId, rating) => async (dispatch) => {
    try {
        dispatch({ type: ADD_RATING_REQUEST });

        const response = await apiConfig.post(
            `/api/product/ratings/create/${productId}/${rating}`
        );

        const data = response.data;
        
        dispatch({
            type: ADD_RATING_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADD_RATING_FAILURE,
            payload: error.message
        });
    }
};
