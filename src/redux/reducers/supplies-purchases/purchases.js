import {
  GET_PURCHASES_START,
  GET_PURCHASES_SUCCESS,
  GET_PURCHASES_ERROR,
  ADD_PURCHASE_START,
  ADD_PURCHASE_SUCCESS,
  ADD_PURCHASE_ERROR,
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
    case ADD_PURCHASE_START:
      return {
        ...state,
        error: null,
        isProcessing: true,
      };
    case ADD_PURCHASE_SUCCESS:
      return {
        ...state,
        purchases: [...state.purchases, action.purchase],
        error: null,
        isProcessing: false,
      };

    case ADD_PURCHASE_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };
    default:
      return state;
  }
};
