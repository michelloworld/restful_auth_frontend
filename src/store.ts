import { createStore, applyMiddleware, Store } from "redux";
import { createWrapper, Context } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

let store: any;

export const makeStore = (context?: Context) => {
  store = createStore(reducers, applyMiddleware(thunkMiddleware));
  return store;
};

export const wrapper = createWrapper<Store>(makeStore, { debug: false });

export { store };
