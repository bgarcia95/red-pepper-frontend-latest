import {
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  ADD_CATEGORY_START,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_ERROR,
  UPDATE_CATEGORY_START,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
} from "../../utils/actions";

// Default state
const categoriesDefaultState = {
  categories: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = categoriesDefaultState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        error: true,
      };
    case ADD_CATEGORY_START:
      return {
        ...state,
        error: null,
        isProcessing: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.category],
        error: null,
        isProcessing: false,
      };

    case ADD_CATEGORY_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };

    case UPDATE_CATEGORY_START:
      return {
        ...state,
        isProcessing: true,
        error: null,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        error: null,
        categories: state.categories.map((category) =>
          category.id === action.category.id
            ? (category = action.category)
            : category
        ),
        isProcessing: false,
      };
    case UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };
    case DELETE_CATEGORY_START:
      return {
        ...state,
        error: null,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        error: null,
        categories: state.categories.filter(({ id }) => id !== action.id),
      };
    case DELETE_CATEGORY_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
