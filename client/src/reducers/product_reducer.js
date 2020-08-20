import { GET_PRODUCTS, GET_PRODUCT_CATEGORY } from "../actions/products";

const initialState = {
  products: [],
  productsCategory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products }

    case GET_PRODUCT_CATEGORY:
      return {
        productsCategory: [...state.product],
      };
    default:
      return initialState;
  }
};
