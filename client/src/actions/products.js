import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
// export const ADD_PRODUCT = "ADD_PRODUCT";
// export const DELETE_PRODUCT = "DELETE_PRODUCT";
// export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
// export const GET_PRODUCT_CATEGORY = "GET_PRODUCT_CATEGORY";

//Action Creators (thunk middleware nos permite ejecutar funciones como acciones en vez de objetos)
export const getProducts = () => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/products`).then((products) => {
      dispatch({
        type: GET_PRODUCTS,
        products,
      });
    });
  };
};

// export const addProduct = (product) => {
//   return (dispatch) => {
//     axios.post("http://localhost:3000/products", product).then(
//       dispatch({
//         type: ADD_PRODUCT,
//       })
//     );
//   };
// };

// export const updateProduct = (product, id) => {
//   return (dispatch) => {
//     axios.put(`http://localhost:3000/products/${id}`, product).then(
//       dispatch({
//         type: UPDATE_PRODUCT,
//       })
//     );
//   };
// };

// export const deleteProduct = (id) => {
//   return (dispatch) => {
//     axios.delete(`http://localhost:3000/products/${id}`).then(
//       dispatch({
//         type: DELETE_PRODUCT,
//       })
//     );
//   };
// };

// export const getProductCategory = (id) => {
//   return (dispatch) => {
//     axios.get(`http://localhost:3000/products/${id}`).then((product) => {
//       dispatch({
//         type: DELETE_PRODUCT,
//         product,
//       });
//     });
//   };
// };
