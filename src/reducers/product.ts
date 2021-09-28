import types from "../types";

interface IPackageResponse {
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IState {
  products: IPackageResponse[];
  productsMeta: object | null;
  loading: boolean;
}

const initState: IState = {
  products: [],
  productsMeta: null,
  loading: false,
};

const product = (state = initState, action = {} as any) => {
  switch (action.type) {
    case types.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data,
        productsMeta: action.payload.meta,
      };
    case types.GET_PRODUCTS_FAILURE:
      return { ...state, loading: false, products: null };

    default:
      return state;
  }
};

export default product;
