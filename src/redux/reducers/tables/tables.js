import {
  GET_TABLES_START,
  GET_TABLES_SUCCESS,
  GET_TABLES_ERROR,
  ADD_TABLE_START,
  ADD_TABLE_SUCCESS,
  ADD_TABLE_ERROR,
  UPDATE_TABLE_START,
  UPDATE_TABLE_SUCCESS,
  UPDATE_TABLE_ERROR,
  DELETE_TABLE_START,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_ERROR,
} from "redux/utils/actions";

// Default state
const tablesDefaultState = {
  tables: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = tablesDefaultState, action) => {
  switch (action.type) {
    case GET_TABLES_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case GET_TABLES_SUCCESS:
      return {
        ...state,
        tables: action.tables,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_TABLES_ERROR:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        error: true,
      };
    case ADD_TABLE_START:
      return {
        ...state,
        error: null,
        isProcessing: true,
      };
    case ADD_TABLE_SUCCESS:
      return {
        ...state,
        tables: [...state.tables, action.table],
        error: null,
        isProcessing: false,
      };

    case ADD_TABLE_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };

    case UPDATE_TABLE_START:
      return {
        ...state,
        isProcessing: true,
        error: null,
      };
    case UPDATE_TABLE_SUCCESS:
      return {
        ...state,
        error: null,
        tables: state.tables.map((table) =>
          table.id === action.table.id ? (table = action.table) : table
        ),
        isProcessing: false,
      };
    case UPDATE_TABLE_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };
    case DELETE_TABLE_START:
      return {
        ...state,
        error: null,
      };
    case DELETE_TABLE_SUCCESS:
      return {
        ...state,
        error: null,
        tables: state.tables.filter(({ id }) => id !== action.id),
      };
    case DELETE_TABLE_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
