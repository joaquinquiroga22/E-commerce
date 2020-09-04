import axios from "axios";

export const EDIT_ORDER = "EDIT_ORDER";
export const GET_ORDER = "GET_ORDER";

  export const editOrder = (data, id) => {
    console.log("Accion edit un order");
    return (dispatch) => {
      axios.put(`http://localhost:3000/orders/${id}`, data).then((order) => {
        dispatch({
          type: EDIT_ORDER,
          product: order.data,
        });
      });
    };
  };

 

