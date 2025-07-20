import { api } from "../../config/apiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const address = reqData?.address || reqData;
    const navigate = reqData?.navigate;

    const { data } = await api.post("/api/orders", address);
    console.log("actual data : ", data);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    if (navigate && data._id) {
      navigate({ search: `step=3&order_id=${data._id}` });
    }

    return { payload: data };

  } catch (error) {
    console.log("catch error : ", error);
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    throw error;
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    console.log("order by id ", data);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });

  } catch (error) {
    console.log("catch error : ", error);
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};
