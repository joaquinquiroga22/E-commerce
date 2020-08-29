import axios from "axios";

export const GET_CATEGORY = "GET_CATEGORY";
export const GET_CATEGORY_PRODUCT = "GET_CATEGORY_PRODUCT";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID";

//ACTION TRAE LISTA DE CATEGORIAS
export const getCategories = () => {
  console.log(`ACCION OBTENER TODAS LAS CATEGORIAS`);
  return (dispatch) => {
    axios.get(`http://localhost:3000/products/category`).then((res) => {
      dispatch({
        type: GET_CATEGORY,
        categories: res.data,
      });
    });
  };
};

export const getCategoryById = (id) => {
  console.log(`ACCION OBTENER LA CATEGORIA ID: ${id}`);
  return (dispatch) => {
    axios.get(`http://localhost:3000/products/category/${id}`).then((cat) => {
      dispatch({
        type: GET_CATEGORY_BY_ID,
        category: cat.data,
      });
    });
  };
};

//ACTION TRAE LISTA DE PRODUCTOS ASIGNADOS A x CATEGORIA
export const getCategoryProduct = (id) => {
  console.log(`ACCION OBTENER TODOS LOS PRODUCTOS EN CATEGORIA ID: ${id}`);
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/products/category/?id=${id}`)
      .then((res) => {
        dispatch({
          type: GET_CATEGORY_PRODUCT,
          categoriesProducts: res.data[0].products,
        });
      });
  };
};

export const addCategory = (data) => {
  console.log(`ACCION AGREGAR CATEGORIA`);
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

export const deleteCategory = (id) => {
  console.log(`ACCION ELIMINAR LA CATEGORIA CON ID: ${id}`);
  return (dispatch) => {
    axios.delete(`http://localhost:3000/products/category/${id}`).then(() => {
      dispatch({
        type: DELETE_CATEGORY,
        id,
      });
    });
  };
};

export const editCategory = (id, data) => {
  console.log(`ACCION EDITAR LA CATEGORIA CON ID: ${id}`);
  return (dispatch) => {
    axios
      .put(`http://localhost:3000/products/category/${id}`, data)
      .then((category) => {
        dispatch({
          type: EDIT_CATEGORY,
          category: category.data,
        });
      });
  };
};
