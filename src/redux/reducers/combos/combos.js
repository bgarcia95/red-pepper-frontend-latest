import {
  GET_COMBOS_START,
  GET_COMBOS_SUCCESS,
  GET_COMBOS_ERROR,
  ADD_COMBO_START,
  ADD_COMBO_ERROR,
  ADD_COMBO_SUCCESS,
  UPDATE_COMBO_START,
  UPDATE_COMBO_SUCCESS,
  UPDATE_COMBO_ERROR,
  DELETE_COMBO_START,
  DELETE_COMBO_SUCCESS,
  DELETE_COMBO_ERROR,
} from "redux/utils/actions";

// Default state
const combosDefaultState = {
  combos: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = combosDefaultState, action) => {
  switch (action.type) {
    case GET_COMBOS_START:
      return {
        ...state,
        isFetching: true,
      };
    case GET_COMBOS_SUCCESS:
      return {
        ...state,
        combos: action.combos,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_COMBOS_ERROR:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        error: true,
      };
    case ADD_COMBO_START:
      return {
        ...state,
        error: null,
        isProcessing: true,
      };
    case ADD_COMBO_SUCCESS:
      return {
        ...state,
        combos: [...state.combos, action.combo],
        error: null,
        isProcessing: false,
      };

    case ADD_COMBO_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };

    case UPDATE_COMBO_START:
      return {
        ...state,
        isProcessing: true,
        error: null,
      };
    case UPDATE_COMBO_SUCCESS:
      return {
        ...state,
        error: null,
        combos: state.combos.map((combo) =>
          combo.id === action.combo.id ? (combo = action.combo) : combo
        ),
        isProcessing: false,
      };
    case UPDATE_COMBO_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };
    case DELETE_COMBO_START:
      return {
        ...state,
        error: null,
      };
    case DELETE_COMBO_SUCCESS:
      return {
        ...state,
        error: null,
        combos: state.combos.filter(({ id }) => id !== action.id),
      };
    case DELETE_COMBO_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
