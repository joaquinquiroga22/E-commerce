export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_QUANTITY = "SET_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";
export const GET_CART = "GET_CART";

<<<<<<< HEAD
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

//Si mandan idUser hago post al server sino no (para localstorage)
export const addToCart = (product, idUser) => {
  if (idUser) {
    //lamado al server para agregar al cart
    //POST /users/idUser/ {prudct.id} y mandar al reducer
    // return {
    //   type: ADD_TO_CART,
    //   product,
    // };
  } else {
    return {
      type: ADD_TO_CART,
      product,
    };
  }
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
    //POST al server /users/idUser/cart y se le manda el productId y el qty
  }
  return {
    type: SET_QUANTITY,
    productId,
    qty,
  };
=======
export const addToCart = (id) => {
  dispatchEvent({
    type: ADD_TO_CART,
    id,
  });
>>>>>>> master
};

//Si mandan idUser hago delete al server sino no (para localstorage)
export const emptyCart = (idUser) => {
  if (idUser) {
    //Delete al server /users/idUser/cart y ver que pasa
  }
  return {
    type: EMPTY_CART,
  };
};
