import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/products";
import {GET_CART} from '../actions/cart';

const initialState = {
  products: [],
  product: {},
  Cart: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    //Reemplazo products con lo que devolvio la action
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    // Al arreglo de productos le agrego un nuevoproducto
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
      };

    // Al arrgelo de productos, busco el que tiene el id y lo reemplazo por el nuevo editado
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => {
          return product.id === action.product.id ? action.product : product;
        }),
      };

    //Al arreglo de prouctos le saco el producto eliminado
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
      };
    case GET_CART:
      return {
        ...state,
        Cart: action.cart,
      };
    default:
      return state;
  }
};
