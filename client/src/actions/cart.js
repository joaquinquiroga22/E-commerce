import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_QUANTITY = "SET_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";
export const GET_CART = "GET_CART";

//Action para mandar al reducer lo que este en DB (Si esta logueado) o lo que este en LocalStorage
export const getCart = (localCart, user) => {
  if (user) {
    //llamado al server y traer orden en status cart
    // Y return el resultado al reducer
    // return {
    //   type: GET_CART,
    //   products: resdelaxios
    // };
    //mando al reducer lo que me mandaron del localCart
  } else {
    return {
      type: GET_CART,
      products: localCart,
    };
  }
};

//Si mandan idUser hago post al server sino no no
export const addToCart = (product, idUser) => {
  if (idUser) {
    let data = {
      idProduct: product.id,
      description: "hola desde redux",
      quantity: 1,
      address: "chau desde redux",
    };
    axios.post(`http://localhost:3000/users/${idUser}/cart`, data);
  }
  return {
    type: ADD_TO_CART,
    product,
  };
};

//Si mandan idUser hago delete al server sino no (para localstorage)???
export const removeFromCart = (productId, idUser) => {
  if (idUser) {
    //lamado al server para eliminar producto del cart (PUT???)
    //POST /users/idUser/ {prudct.id} y mandar al reducer
    // return {
    //   type: REMOVE_FROM_CART,
    //   productId,
    // };
  } else {
    return {
      type: REMOVE_FROM_CART,
      productId,
    };
  }
};

//Si mandan idUser hago put al server sino no (para localstorage)
export const setQuantity = (productId, qty, idUser) => {
  if (idUser) {
    let data = {
      quantity: qty,
      idProducto: productId,
    };
    axios.put(`http://localhost:3000/users/${idUser}/cart`, data);
  }
  return {
    type: SET_QUANTITY,
    productId,
    qty,
  };
};

//Si mandan idUser hago delete al server sino no (para localstorage)
export const emptyCart = (idUser) => {
  if (idUser) {
    axios.delete(`http://localhost:3000/users/${idUser}/cart`);
  }
  return {
    type: EMPTY_CART,
  };
};
