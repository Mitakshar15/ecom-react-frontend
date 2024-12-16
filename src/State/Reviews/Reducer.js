import {
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAILURE,
    FIND_ALL_REVIEWS_REQUEST,
    FIND_ALL_REVIEWS_SUCCESS,
    FIND_ALL_REVIEWS_FAILURE,
} from "./ActionType";

const initialState = {
    reviews: [],
    loading: false,
    error: null,
    success: false,
};

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
        case FIND_ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: [...state.reviews, action.payload],
                success: true,
            };

        case FIND_ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
                error: null,
            };

        case ADD_REVIEW_FAILURE:
        case FIND_ALL_REVIEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        default:
            return state;
    }
};
