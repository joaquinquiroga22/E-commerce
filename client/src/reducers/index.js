import { combineReducers } from "redux";
import products from "./product_reducer";
import categories from "./category_reducers";

const rootReducer = combineReducers({
  products,
  categories,
});

export default rootReducer;
