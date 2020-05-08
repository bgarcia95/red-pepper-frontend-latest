import {
  GET_SUPPLIES_START,
  GET_SUPPLIES_SUCCESS,
  GET_SUPPLIES_ERROR,
} from "../../utils/actions";

// Default state
const suppliesDefaultState = {
  supplies: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = suppliesDefaultState, action) => {
  switch (action.type) {
    case GET_SUPPLIES_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_SUPPLIES_SUCCESS:
      return {
        ...state,
        supplies: action.supplies,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_SUPPLIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default:
      return state;
  }
};
