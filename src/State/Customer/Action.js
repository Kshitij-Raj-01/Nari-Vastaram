// State/Customer/Action.js
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
} from "./ActionType";

const getCustomersRequest = () => ({ type: GET_CUSTOMERS_REQUEST });
const getCustomersSuccess = (customers) => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers,
});
const getCustomersFailure = (error) => ({
  type: GET_CUSTOMERS_FAILURE,
  payload: error,
});

export const getAllCustomers = () => async (dispatch) => {
  dispatch(getCustomersRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users`);
    dispatch(getCustomersSuccess(response.data));
  } catch (error) {
    dispatch(getCustomersFailure(error.message));
  }
};
