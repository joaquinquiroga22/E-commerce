import { combineReducers } from "redux";
import products from "./product_reducer";
import categories from "./category_reducers";
import users from "./user_reducer";
import user from "../store/userDuck";

const rootReducer = combineReducers({
  products,
  categories,
  users,
  user,
});

export default rootReducer;
