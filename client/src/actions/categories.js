import axios from "axios";

export const GET_CATEGORY = "GET_CATEGORY";
export const GET_CATEGORY_PRODUCT = "GET_CATEGORY_PRODUCT";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const GET_CATEGORY_BY_NAME = "GET_CATEGORY_BY_NAME";

export const getCategories = () => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/products/category`).then((res) => {
      dispatch({
        type: GET_CATEGORY,
        categories: res.data,
      });
    });
  };
};

export const getCategoryProduct = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/products/category/?id=${id}`)
      .then((res) => {
        dispatch({
          type: GET_CATEGORY_PRODUCT,
          categoriesProducts: res.data,
        });
      });
  };
};

export const addCategory = (data) => {
  return (dispatch) => {
    axios.post("http://localhost:3000/products/category", data).then((res) => {
      dispatch({
        type: ADD_CATEGORY,
        category: data,
      });
    });
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3000/products/category/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_CATEGORY,
          id,
        });
      });
  };
};

export const editCategory = (id, data) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:3000/products/category/${id}`, data)
      .then((res) => {
        dispatch({
          type: EDIT_CATEGORY,
          id,
          data,
        });
      });
  };
};

export const getCategoryByName = (name) => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/products/category/${name}`).then((res) => {
      dispatch({
        type: GET_CATEGORY_BY_NAME,
        category: res.data,
      });
    });
  };
};
