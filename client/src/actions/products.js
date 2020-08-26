import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const GET_PRODUCTxCATEGORIES = "GET_PRODUCTxCATEGORIES";

//Action Creators (thunk middleware nos permite ejecutar funciones como acciones en vez de objetos)

//Trae todos los products productos del back y se lo manda al reducer
export const getProducts = () => {
  console.log("Accion Traer todo los productos");
  return (dispatch) => {
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
  console.log("Accion Traer un producto");
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

//Trae todos los productos asociados a una categoria
export const getCategoryProduct = (id) => {
  console.log(`Accion Traer productos en categoria: ${id}`);
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/products/category/?id=${id}`)
      .then((res) => {
        dispatch({
          type: GET_PRODUCTxCATEGORIES,
          categoriesProducts: res.data[0].products,
        });
      });
  };
};

//Agrega un producto al back y dispatchea action para recargar store de products
export const addProduct = (data) => {
  console.log("Accion Agregar un producto");
  return (dispatch) => {
    axios.post("http://localhost:3000/products", data).then((product) => {
      dispatch(getProducts);
    });
  };
};

export const deleteProduct = (id) => {
  console.log(`Accion  producto con ${id}`);
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
  console.log(`Accion editar producto id: ${id}`);
  return (dispatch) => {
    axios.put(`http://localhost:3000/products/${id}`, data).then((product) => {
      console.log(
        "----------- DEVOLUCION DEL AXIOS DENTRO DEL ACTION --------------"
      );
      console.log(product.data);

      dispatch({
        type: EDIT_PRODUCT,
        product: product.data,
      });
    });
  };
};

export const searchProduct = (query) => {
  console.log(`Accion buscar productos con query: ${query}`);
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/search?valor=${query}`)
      .then((products) => {
        dispatch({
          type: SEARCH_PRODUCT,
          founds: products.data,
        });
      });
  };
};
