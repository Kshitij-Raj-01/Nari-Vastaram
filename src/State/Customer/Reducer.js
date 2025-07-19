import {
    GET_CUSTOMERS_REQUEST,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAILURE,
  } from "./ActionType";
  
  const initialState = {
    customers: [],
    isLoading: false,
    error: null,
  };
  
  export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CUSTOMERS_REQUEST:
        return { ...state, isLoading: true, error: null };
      case GET_CUSTOMERS_SUCCESS:
        return { ...state, isLoading: false, customers: action.payload };
      case GET_CUSTOMERS_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };
  