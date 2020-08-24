import axios from "axios";

export const GET_CATEGORY = "GET_CATEGORY";
export const GET_CATEGORY_PRODUCT = "GET_CATEGORY_PRODUCT";
export const ADD_CATEGORY = "ADD_CATEGORY";

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
      .get(`http://localhost:3000/products/category/?id=${id}`)
      .then((categoriesProducts) => {
        dispatch({
          type: GET_CATEGORY_PRODUCT,
          categoriesProducts,
        });
      });
  };
};

export const addCategory = (data) => {
  return (dispatch) => {
    axions
      .post(`http://localhost:3000/products/category`, data)
      .then((category) => {
        dispatch({
          type: ADD_CATEGORY,
          category: category.data,
        });
      });
  };
};
