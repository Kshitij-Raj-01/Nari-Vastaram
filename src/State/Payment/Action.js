import { api } from "../../config/apiConfig";
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_FAILURE, UPDATE_PAYMENT_REQUEST } from "./ActionType";


export const createPayment = (orderId) => async (dispatch) => {
    dispatch({type: CREATE_PAYMENT_REQUEST});
    try{
        const {data} = await api.post(`api/payments/${orderId}`,{});

        if(data.payment_link_url){
            window.location.href = data.payment_link_url;
        }
        
    } catch(error){
        dispatch({type: CREATE_PAYMENT_FAILURE, payload:error.message});
    }
}

export const codPayment = (orderId) => async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST });
    try {
      const { data } = await api.post(`/api/payments/cod/${orderId}`);
      alert("Order placed with Cash on Delivery ❤️");
      window.location.href = `account/orders/${orderId}`;
    } catch (error) {
      dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
      alert("Failed to place COD order.");
    }
  };
  

export const updatePayment = (paymentId, orderId) => async (dispatch) => {
    dispatch({type: UPDATE_PAYMENT_REQUEST});
    try{

        const {data} = await api.get(`api/payments?payment_id=${paymentId}&order_id=${orderId}`,{});

        console.log("update payment : ",data)
        
    } catch(error){
        dispatch({type: UPDATE_PAYMENT_FAILURE, payload:error.message});
    }
}