import { API_BASE_URL, api } from "../../config/apiConfig";
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  console.log(reqData);
  try {
    const params = new URLSearchParams();

    if (reqData.color) params.append("color", reqData.color);
    if (reqData.sizes) params.append("sizes", reqData.sizes);
    if (reqData.minPrice) params.append("minPrice", reqData.minPrice);
    if (reqData.maxPrice) params.append("maxPrice", reqData.maxPrice);
    if (reqData.minDiscount) params.append("minDiscount", reqData.minDiscount);
    if (reqData.category) params.append("category", reqData.category);
    if (reqData.stock) params.append("stock", reqData.stock);
    if (reqData.sort) params.append("sort", reqData.sort);
    if (reqData.pageNumber) params.append("pageNumber", reqData.pageNumber);
    if (reqData.pageSize) params.append("pageSize", reqData.pageSize);

    const { data } = await api.get(`/api/products?${params.toString()}`);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};


export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  
    try {
      const {data}  = await api.get(
        `/api/products/id/${reqData}`
      );
      console.log("Fetched product:", data);
      dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS, payload:data});
    } catch (error) {
      dispatch({type:FIND_PRODUCT_BY_ID_FAILURE, payload:error.message})
    }
  };

export const createProduct = (product) => async(dispatch) => {
  try{
    dispatch({type: CREATE_PRODUCT_REQUEST})

    const {data} = await api.post(`${API_BASE_URL}/api/admin/products`, product);
    console.log("Create product : ",data)
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data
    })
  } catch(error){
    dispatch({type: CREATE_PRODUCT_FAILURE, payload: error.message})
  }
}

export const deleteProduct = (productId) => async(dispatch) => {
  try{
    dispatch({type: DELETE_PRODUCT_REQUEST})

    const {data} = await api.delete(`/api/admin/products/${productId}`);
    console.log("delete : ", data)
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: productId
    })
  } catch(error){
    dispatch({type: DELETE_PRODUCT_FAILURE, payload: error.message})
  }
}