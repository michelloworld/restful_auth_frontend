import types from "../types";

interface IState {
  accessToken: string | null;
  loggedIn: object | null;
}

const initState: IState = {
  accessToken: null,
  loggedIn: null,
};

const user = (state = initState, action = {} as any) => {
  switch (action.type) {
    case types.SET_LOGGED_IN:
      return { ...state, loggedIn: { email: action.payload } };

    case types.SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };

    case types.SIGN_IN_REQUEST:
      return { ...state };
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        loggedIn: { email: action.payload.email },
        accessToken: action.payload.accessToken,
      };
    case types.SIGN_IN_FAILURE:
      return { ...state, loggedIn: null };

    case types.SIGN_OUT_REQUEST:
      return { ...state };
    case types.SIGN_OUT_SUCCESS:
      return { ...state, loggedIn: null, accessToken: null };
    case types.SIGN_OUT_FAILURE:
      return { ...state, loggedIn: null };

    default:
      return state;
  }
};

export default user;
