import {
  GET_SUPPLIES_START,
  GET_SUPPLIES_SUCCESS,
  GET_SUPPLIES_ERROR,
  ADD_SUPPLY_START,
  ADD_SUPPLY_SUCCESS,
  ADD_SUPPLY_ERROR,
  UPDATE_SUPPLY_START,
  UPDATE_SUPPLY_SUCCESS,
  UPDATE_SUPPLY_ERROR,
  DELETE_SUPPLY_START,
  DELETE_SUPPLY_SUCCESS,
  DELETE_SUPPLY_ERROR,
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

    case UPDATE_SUPPLY_START:
      return {
        ...state,
        isProcessing: true,
        error: null,
        isFetching: false,
      };
    case UPDATE_SUPPLY_SUCCESS:
      return {
        ...state,
        error: null,
        supplies: state.supplies.map(
          (supply) => supply.id === action.supply.id && (supply = action.supply)
        ),
        isProcessing: false,
        isFetching: false,
      };
    case UPDATE_SUPPLY_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
        isFetching: false,
      };
    case DELETE_SUPPLY_START:
      return {
        ...state,
        error: null,
      };
    case DELETE_SUPPLY_SUCCESS:
      return {
        ...state,
        error: null,
        supplies: state.supplies.filter(({ id }) => id !== action.id),
      };
    case DELETE_SUPPLY_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
