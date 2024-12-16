import { 
    ADD_REVIEW_REQUEST, 
    ADD_REVIEW_SUCCESS, 
    ADD_REVIEW_FAILURE,
    FIND_ALL_REVIEWS_REQUEST,
    FIND_ALL_REVIEWS_SUCCESS,
    FIND_ALL_REVIEWS_FAILURE
} from "./ActionType";
import apiConfig from "../../config/apiConfig";

// Add a review
export const addReview = (reviewData) => async (dispatch) => {
    dispatch({ type: ADD_REVIEW_REQUEST });
    try {
        const { data } = await apiConfig.post(
            `/api/product/reviews/create?rating=${reviewData.rating}`, 
            reviewData
        );
        console.log("Review Data",data);
        dispatch({
            type: ADD_REVIEW_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADD_REVIEW_FAILURE,
            payload: error.message,
        });
    }
};

// Find all reviews for a product
export const findProductReviews = (productId) => async (dispatch) => {
    try {
        dispatch({ type: FIND_ALL_REVIEWS_REQUEST });

        const { data } = await apiConfig.get(`/api/product/reviews/${productId}`);
        console.log("Reviews Data",data);
        dispatch({
            type: FIND_ALL_REVIEWS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FIND_ALL_REVIEWS_FAILURE,
            payload: error.message,
        });
    }
};