import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/index";
// import { createLogger } from "redux-logger";

// Middleware para consologuear las acciones
// const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  compose(
<<<<<<< HEAD
    applyMiddleware(thunkMiddleware),
=======
    applyMiddleware(
      thunkMiddleware
      // loggerMiddleware
    ),
>>>>>>> master
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
