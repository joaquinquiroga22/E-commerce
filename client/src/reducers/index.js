import { combineReducers } from "redux";
import products from "./product_reducer";
import categories from "./category_reducers";
import users from "./user_reducer";

const rootReducer = combineReducers({
  products,
  categories,
  users,
});

export default rootReducer;
