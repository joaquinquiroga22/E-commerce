import axios from "axios";

export const GET_CATEGORY = "GET_CATEGORY";
export const GET_CATEGORY_PRODUCT = "GET_CATEGORY_PRODUCT";

//Action Creators (thunk middleware nos permite ejecutar funciones como acciones en vez de objetos)
export const getCategories = () => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/products/category`).then((categories) => {
      dispatch({
        type: GET_CATEGORY,
        categories,
      });
    });
  };
};

export const getCategoryProduct = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/products/category/?id${id}`)
      .then((product) => {
        dispatch({
          type: GET_CATEGORY_PRODUCT,
          product,
        });
      });
  };
};
