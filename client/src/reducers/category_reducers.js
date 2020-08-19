import { GET_CATEGORY, GET_CATEGORY_PRODUCT } from "../actions/categories";

const initialState = {
  categories: [],
  categoryProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY: {
      return {
        categories: [...state.categories],
      };
    }

    case GET_CATEGORY_PRODUCT: {
      return {
        categoryProducts: [...state.categoryProducts],
      };
    }
  }

  return initialState;
};
