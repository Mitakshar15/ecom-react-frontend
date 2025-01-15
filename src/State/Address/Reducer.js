const initialState = {
  data: [],
  loading: false,
  error: null,
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USER_ADDRESS_REQUEST':
        return { ...state, loading: true };
      case 'GET_USER_ADDRESS_SUCCESS':
        return { ...state, loading: false, address: action.payload };
      case 'GET_USER_ADDRESS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default addressReducer;