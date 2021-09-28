import types from "../types";
import Axios from "../services/Axios";
import { IProductRequest } from "../interfaces/IProduct";

export const getProducts = (data?: IProductRequest) => {
  return (dispatch: any) => {
    dispatch({ type: types.GET_PRODUCTS_REQUEST });
    return Axios.get(`/products`, {
      params: data,
    })
      .then((res) => {
        dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: res.data });
        return res;
      })
      .catch((e) => {
        console.log(`[ERROR] - ${e}`);
        dispatch({ type: types.GET_PRODUCTS_FAILURE, error: e.response?.data.error });
        return e;
      });
  };
};
