import {
    EDIT_ORDER
    
  } from "../actions/orders";

  const initialState = {
    orders: [],
    order: {},
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      //Reemplazo products con lo que devolvio la action
      case EDIT_ORDER:
        return {
          ...state,
          orders: action.order,
        };
      
      default:
        return state;
    }
  };