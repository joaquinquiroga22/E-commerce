import {
  GET_CATEGORY,
  GET_CATEGORY_PRODUCT,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORY_BY_NAME,
} from "../actions/categories";

const initialState = {
  categories: [],
  categoryProducts: [],
  category: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY: {
      return {
        ...state,
        categories: action.categories,
      };
    }

    case GET_CATEGORY_PRODUCT: {
      return {
        ...state,
        categoryProducts: action.categoriesProducts,
      };
    }

    case ADD_CATEGORY: {
      return {
        ...state,
        categories: [...state.categories, action.category],
      };
    }

    case DELETE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.id
        ),
      };
    }

    case EDIT_CATEGORY: {
      return {
        ...state,
        categories: state.categories.map((category) => {
          return category.id === action.id ? action.data : category;
        }),
      };
    }

    case GET_CATEGORY_BY_NAME: {
      return {
        ...state,
        category: action.category,
      };
    }

    default:
      return initialState;
  }
};
