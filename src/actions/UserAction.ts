import axios from "axios";
import Axios from "../services/Axios";
import { ISignInRequest } from "./../interfaces/ISignIn";
import types from "../types";

export const setLoggedIn = (data: any) => {
  return (dispatch: any) => {
    dispatch({ type: types.SET_LOGGED_IN, payload: data });
  };
};

export const setAccessToken = (data: string) => {
  return (dispatch: any) => {
    dispatch({ type: types.SET_ACCESS_TOKEN, payload: data });
  };
};

export const signIn = (data: ISignInRequest) => {
  return (dispatch: any) => {
    dispatch({ type: types.SIGN_IN_REQUEST });
    return axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/token`, data)
      .then((res) => {
        dispatch({ type: types.SIGN_IN_SUCCESS, payload: res.data.data });
        return res;
      })
      .catch((e) => {
        console.log(`[ERROR] - ${e}`);
        dispatch({ type: types.SIGN_IN_FAILURE, error: e.response.data.error });
        return e;
      });
  };
};

export const signOut = () => {
  return (dispatch: any) => {
    dispatch({ type: types.SIGN_OUT_REQUEST });
    return Axios.post(`${process.env.NEXT_PUBLIC_URL}/api/sign_out`)
      .then((res) => {
        dispatch({ type: types.SIGN_OUT_SUCCESS, payload: res.data.data });
        return res;
      })
      .catch((e) => {
        console.log(`[ERROR] - ${e}`);
        dispatch({ type: types.SIGN_OUT_FAILURE, error: e.response.data.error });
        return e;
      });
  };
};
