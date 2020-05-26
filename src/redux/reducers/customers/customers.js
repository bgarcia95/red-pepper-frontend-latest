import {
  GET_CUSTOMERS_START,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_ERROR,
  ADD_CUSTOMER_START,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_ERROR,
  UPDATE_CUSTOMER_START,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_ERROR,
  DELETE_CUSTOMER_START,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_ERROR,
} from "redux/utils/actions";

// Default state
const customersDefaultState = {
  customers: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = customersDefaultState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.customers,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_CUSTOMERS_ERROR:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        error: true,
      };
    case ADD_CUSTOMER_START:
      return {
        ...state,
        error: null,
        isProcessing: true,
      };
    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.customer],
        error: null,
        isProcessing: false,
      };

    case ADD_CUSTOMER_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };

    case UPDATE_CUSTOMER_START:
      return {
        ...state,
        isProcessing: true,
        error: null,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: null,
        customers: state.customers.map((customer) =>
          customer.id === action.customer.id
            ? (customer = action.customer)
            : customer
        ),
        isProcessing: false,
      };
    case UPDATE_CUSTOMER_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };
    case DELETE_CUSTOMER_START:
      return {
        ...state,
        error: null,
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: null,
        customers: state.customers.filter(({ id }) => id !== action.id),
      };
    case DELETE_CUSTOMER_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
