import http from "services/httpService";
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

// All GET methods
export const getCustomersStart = () => ({
  type: GET_CUSTOMERS_START,
});

export const getCustomersSuccess = (customers) => ({
  type: GET_CUSTOMERS_SUCCESS,
  customers,
});

export const getCustomersError = (error) => ({
  type: GET_CUSTOMERS_ERROR,
  error,
});

export const getCustomersAction = () => {
  return (dispatch) => {
    dispatch(getCustomersStart());

    // Retrieve data from API
    http
      .get("/customers")
      .then((response) => {
        dispatch(getCustomersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getCustomersError(error));
      });
  };
};

// ALL POST METHODS

export const addCustomerStart = () => ({
  type: ADD_CUSTOMER_START,
});

export const addCustomerSuccess = (customer) => ({
  type: ADD_CUSTOMER_SUCCESS,
  customer,
});

export const addCustomerError = (error) => ({
  type: ADD_CUSTOMER_ERROR,
  error,
});

export const addCustomerAction = (customer) => {
  return (dispatch) => {
    dispatch(addCustomerStart());

    // Insert into db
    http
      .post("/customers", customer)
      .then((response) => {
        dispatch(addCustomerSuccess(response.data));
        dispatch(getCustomersAction());
      })
      .catch((error) => {
        dispatch(addCustomerError(error));
      });
  };
};

// ALL PUT (PATCH) METHODS

export const updateCustomerStart = () => ({
  type: UPDATE_CUSTOMER_START,
});

export const updateCustomerSuccess = (customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  customer,
});

export const updateCustomerError = (error) => ({
  type: UPDATE_CUSTOMER_ERROR,
  error,
});

export const updateCustomerAction = (customer) => {
  return (dispatch) => {
    dispatch(updateCustomerStart());

    http
      .put("/customers", customer)
      .then((response) => {
        dispatch(updateCustomerSuccess(response.data));
        dispatch(getCustomersAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateCustomerError(error));
      });
  };
};

// ALL DELETE METHODS

export const deleteCustomerStart = () => ({
  type: DELETE_CUSTOMER_START,
});

export const deleteCustomerSuccess = (id) => ({
  type: DELETE_CUSTOMER_SUCCESS,
  id,
});

export const deleteCustomerError = (error) => ({
  type: DELETE_CUSTOMER_ERROR,
  error,
});
export const deleteCustomerAction = (id) => {
  return (dispatch) => {
    http
      .delete(`customers?id=${id}`)
      .then((response) => {
        dispatch(deleteCustomerSuccess(response.data.id));
        dispatch(getCustomersAction());
      })
      .catch((error) => {
        dispatch(deleteCustomerError(error));
      });
  };
};
