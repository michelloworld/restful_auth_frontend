import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import product from "./product";

const reducers = {
  user,
  product,
};

const combinedReducer = combineReducers(reducers);

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    if (state.user.loggedIn) nextState.user.loggedIn = state.user.loggedIn;
    if (state.user.accessToken) nextState.user.accessToken = state.user.accessToken;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer;
