import { GET_CATEGORY, GET_CATEGORY_PRODUCT } from "../actions/categories";

const initialState = {
  categories: [],
  categoryProducts: [],
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

    default:
      return initialState;
  }
};
