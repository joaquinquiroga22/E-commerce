import {
  GET_CATEGORY,
  GET_CATEGORY_PRODUCT,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from "../actions/categories";

const initialState = {
  categories: [],
  categoryProducts: [],
  category: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: action.categories,
      };

    case GET_CATEGORY_PRODUCT:
      return {
        ...state,
        categoryProducts: action.categoriesProducts,
      };

    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category],
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.id),
      };

    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((cat) => {
          return cat.id === action.id ? action.category : cat;
        }),
      };
    default:
      return state;
  }
};
