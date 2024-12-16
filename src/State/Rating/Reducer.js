import { ADD_RATING_FAILURE,
         ADD_RATING_REQUEST,
         ADD_RATING_SUCCESS} from './ActionType';

const initialState = {
    ratings: [],
    loading: false,
    error: null,
    rating: null
};

export const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RATING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ADD_RATING_SUCCESS:
            return {
                ...state,
                loading: false,
                ratings: [...state.ratings, action.payload],
                rating: action.payload
            };

        case ADD_RATING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
