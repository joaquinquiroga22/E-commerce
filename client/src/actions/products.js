import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_CATEGORY = "GET_PRODUCT_CATEGORY";

//Action Creators (thunk middleware nos permite ejecutar funciones como acciones en vez de objetos)
export const getProducts = () => {
  return (dispatch) => {
    console.log("hola")
    axios.get(`http://localhost:3000/products`).then((products) => {
      dispatch({
        type: GET_PRODUCTS,
        products: products.data,
      });
    });
  };
};

export const getProductCategory = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/products/${id}`).then((product) => {
      dispatch({
        type: GET_PRODUCT_CATEGORY,
        product,
      });
    });
  };
};
