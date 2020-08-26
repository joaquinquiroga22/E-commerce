import { loginWithGoogle } from "../firebase";

//Constantes

const initialData = {
  loggedIn: false,
  fetching: false,
};
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

// Reducers
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true };
    default:
      return state;
  }
}

// Actions

export const loginWithGoogleAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(getState);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message,
      });
    });
};

// auxiliar

function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}
