import { api } from "../../config/apiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "./ActionType";

// 💌 Create a new order
export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const { data } = await api.post("/api/orders", reqData.address);
    console.log("Actual data from order creation:", data);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    if (data._id) {
      reqData.navigate({
        search: `step=3&order_id=${data._id}`, // 💍 Corrected template literal
      });
    }
  } catch (error) {
    console.log("Order creation failed:", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 💌 Get order by ID
export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/orders/${orderId}`); // 💖 Corrected string interpolation
    console.log("Fetched order by ID:", data);

    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("Get order by ID failed:", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
