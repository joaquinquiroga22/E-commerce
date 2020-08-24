import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
//Action Creators (thunk middleware nos permite ejecutar funciones como acciones en vez de objetos)

//Trae todos los products productos del back y se lo manda al reducer
export const getProducts = () => {
  return (dispatch) => {
    console.log("hola");
    axios.get(`http://localhost:3000/products`).then((products) => {
      dispatch({
        type: GET_PRODUCTS,
        products: products.data,
      });
    });
  };
};

//trae un unico producto por id del back y lo manda al reducer
export const getProduct = (id) => {
  console.log("Entre en la accion");
  return (dispatch) => {
    axios.get(`http://localhost:3000/products/${id}`).then((product) => {
      console.log(product);
      dispatch({
        type: GET_PRODUCT,
        product: product.data,
      });
    });
  };
};

//Agrega un producto al back y manda al reducer el mismo producto
export const addProduct = (data) => {
  return (dispatch) => {
    axios.post("http://localhost:3000/products", data).then((product) => {
      dispatch({
        type: ADD_PRODUCT,
        product: product.data,
      });
    });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3000/products/${id}`).then(
      dispatch({
        type: DELETE_PRODUCT,
        id,
      })
    );
  };
};

export const editProduct = (id, data) => {
  return (dispatch) => {
    axios.put(`http://localhost:3000/products/${id}`, data).then((product) => {
      dispatch({
        type: EDIT_PRODUCT,
        product: product.data,
      });
    });
  };
};
