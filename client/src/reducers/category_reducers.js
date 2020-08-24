import {
  GET_CATEGORY,
  GET_CATEGORY_PRODUCT,
  ADD_CATEGORY,

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

        category: action.category,
      };
    }

    default:
      return initialState;
  }
};
