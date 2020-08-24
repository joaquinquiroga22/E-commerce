import axios from "axios";
import { DELETE_PRODUCT } from "./products";

export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";

export const getAllUsers = () => {
  return (dispatch) => {
    axios.get("http://localhost:3000/users").then((users) => {
      dispatch({
        type: GET_USERS,
        users: users.data,
      });
    });
  };
};

export const addUser = (data) => {
  return (dispatch) => {
    axios.post(`http://localhost:3000/users`, data).then((user) => {
      dispatch({
        type: ADD_USER,
        user: user.data,
      });
    });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3000/users/${id}`).then(() => {
      dispatch({
        type: DELETE_USER,
        id,
      });
    });
  };
};

export const editUser = (id, data) => {
  axios.put(`http://localhost:3000/users/${id}`, data).then((user) => {
    dispatch({
      type: EDIT_USER,
      user: user.data,
    });
  });
};
