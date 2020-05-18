import {
  GET_DISHES_START,
  GET_DISHES_SUCCESS,
  GET_DISHES_ERROR,
  ADD_DISH_START,
  ADD_DISH_ERROR,
  ADD_DISH_SUCCESS,
  UPDATE_DISH_START,
  UPDATE_DISH_SUCCESS,
  UPDATE_DISH_ERROR,
  DELETE_DISH_START,
  DELETE_DISH_SUCCESS,
  DELETE_DISH_ERROR,
} from "../../utils/actions";

// Default state
const dishesDefaultState = {
  dishes: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = dishesDefaultState, action) => {
  switch (action.type) {
    case GET_DISHES_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_DISHES_SUCCESS:
      return {
        ...state,
        dishes: action.dishes,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_DISHES_ERROR:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        error: true,
      };
    case ADD_DISH_START:
      return {
        ...state,
        error: null,
        isProcessing: true,
      };
    case ADD_DISH_SUCCESS:
      return {
        ...state,
        dishes: [...state.dishes, action.dish],
        error: null,
        isProcessing: false,
      };

    case ADD_DISH_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };

    case UPDATE_DISH_START:
      return {
        ...state,
        isProcessing: true,
        error: null,
        isFetching: false,
      };
    case UPDATE_DISH_SUCCESS:
      return {
        ...state,
        error: null,
        dishes: state.dishes.map((dish) =>
          dish.id === action.dish.id ? (dish = action.dish) : dish
        ),
        isProcessing: false,
        isFetching: false,
      };
    case UPDATE_DISH_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
        isFetching: false,
      };
    case DELETE_DISH_START:
      return {
        ...state,
        error: null,
      };
    case DELETE_DISH_SUCCESS:
      return {
        ...state,
        error: null,
        dishes: state.dishes.filter(({ id }) => id !== action.id),
      };
    case DELETE_DISH_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
