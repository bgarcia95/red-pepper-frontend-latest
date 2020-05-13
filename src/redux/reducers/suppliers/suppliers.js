import {
  GET_SUPPLIERS_START,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_ERROR,
  ADD_SUPPLIER_START,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_ERROR,
  UPDATE_SUPPLIER_START,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_ERROR,
  DELETE_SUPPLIER_START,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_ERROR,
} from "../../utils/actions";

// Default state
const suppliersDefaultState = {
  suppliers: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = suppliersDefaultState, action) => {
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
        isFetching: false,
        error: true,
      };
    case ADD_SUPPLIER_START:
      return {
        ...state,
        error: null,
        isProcessing: true,
      };
    case ADD_SUPPLIER_SUCCESS:
      return {
        ...state,
        suppliers: [...state.suppliers, action.supplier],
        error: null,
        isProcessing: false,
      };

    case ADD_SUPPLIER_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };

    case UPDATE_SUPPLIER_START:
      return {
        ...state,
        isProcessing: true,
        error: null,
        isFetching: false,
      };
    case UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        error: null,
        suppliers: state.suppliers.map(
          (supplier) =>
            supplier.id === action.supplier.id && (supplier = action.supplier)
        ),
        isProcessing: false,
        isFetching: false,
      };
    case UPDATE_SUPPLIER_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
        isFetching: false,
      };
    case DELETE_SUPPLIER_START:
      return {
        ...state,
        error: null,
      };
    case DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        error: null,
        suppliers: state.suppliers.filter(({ id }) => id !== action.id),
      };
    case DELETE_SUPPLIER_ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
