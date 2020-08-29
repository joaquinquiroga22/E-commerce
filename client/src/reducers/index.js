import { combineReducers } from "redux";
import products from "./product_reducer";
import categories from "./category_reducers";
import user from "./user_reducer";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  products,
  categories,
  user,
  authentication,
  registration,
  users,
  alert,
});

export default rootReducer;
