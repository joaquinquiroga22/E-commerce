import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../action_creators/products";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  return initialState;
};
