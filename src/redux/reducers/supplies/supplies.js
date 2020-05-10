import {
  GET_SUPPLIES_START,
  GET_SUPPLIES_SUCCESS,
  GET_SUPPLIES_ERROR,
  ADD_SUPPLY_START,
  ADD_SUPPLY_SUCCESS,
  ADD_SUPPLY_ERROR,
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
    case ADD_SUPPLY_START:
      return {
        ...state,
        error: null,
      };
    case ADD_SUPPLY_SUCCESS:
      return {
        ...state,
        supplies: [...state.supplies, action.supply],
        error: null,
      };

    case ADD_SUPPLY_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
