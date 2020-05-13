import {
  GET_PURCHASES_START,
  GET_PURCHASES_SUCCESS,
  GET_PURCHASES_ERROR,
} from "../../utils/actions";

// Default state
const purchasesDefaultState = {
  purchases: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = purchasesDefaultState, action) => {
  switch (action.type) {
    case GET_PURCHASES_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case GET_PURCHASES_SUCCESS:
      return {
        ...state,
        purchases: action.purchases,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_PURCHASES_ERROR:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};
