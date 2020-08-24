import axios from "axios";

export const GET_CATEGORY = "GET_CATEGORY";
export const GET_CATEGORY_PRODUCT = "GET_CATEGORY_PRODUCT";
export const ADD_CATEGORY = "ADD_CATEGORY";

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
    axios
      .post(`http://localhost:3000/products/category`, data)
      .then((category) => {
        dispatch({
          type: ADD_CATEGORY,
          category: category.data,
        });
      });
  };
};
