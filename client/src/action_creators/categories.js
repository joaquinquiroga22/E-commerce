export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

axios.get(`http://localhost:3000/products`).then(function (response) {
  setProducts(response.data);
});
