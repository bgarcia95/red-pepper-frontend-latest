import {
  GET_SUPPLIERS_START,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_ERROR,
} from "../../utils/actions";

// Default state
const suppliesDefaultState = {
  suppliers: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = suppliesDefaultState, action) => {
  switch (action.type) {
    case GET_SUPPLIERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_SUPPLIERS_SUCCESS:
      return {
        ...state,
        suppliers: action.suppliers,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_SUPPLIERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default:
      return state;
  }
};
