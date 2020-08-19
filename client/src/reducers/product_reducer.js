import { GET_PRODUCTS } from "../actions/products";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        products: [...state.products],
      };
  }

  return initialState;
};
