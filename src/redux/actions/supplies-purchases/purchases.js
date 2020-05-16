import http from "../../../services/httpService";
import {
  GET_PURCHASES_START,
  GET_PURCHASES_SUCCESS,
  GET_PURCHASES_ERROR,
  ADD_PURCHASE_START,
  ADD_PURCHASE_SUCCESS,
  ADD_PURCHASE_ERROR,
} from "../../utils/actions";

// All GET Methods
export const getPurchasesStart = () => ({
  type: GET_PURCHASES_START,
});

export const getPurchasesSuccess = (purchases) => ({
  type: GET_PURCHASES_SUCCESS,
  purchases,
});

export const getPurchasesError = (error) => ({
  type: GET_PURCHASES_ERROR,
  error,
});

export const getPurchasesAction = () => {
  return (dispatch) => {
    dispatch(getPurchasesStart());

    // Retrieve data from API
    http
      .get("/invoiceSupply")
      .then((response) => {
        dispatch(getPurchasesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getPurchasesError(error));
      });
  };
};

// ALL POST Methods

export const addPurchaseStart = () => ({
  type: ADD_PURCHASE_START,
});

export const addPurchaseSuccess = (purchase) => ({
  type: ADD_PURCHASE_SUCCESS,
  purchase,
});

export const addPurchaseError = (error) => ({
  type: ADD_PURCHASE_ERROR,
  error,
});

export const addPurchaseAction = (purchase) => {
  return (dispatch) => {
    dispatch(addPurchaseStart());

    // Insert into DB
    http
      .post("/invoiceSupply", purchase)
      .then(() => {
        // If insertion is successful
        dispatch(addPurchaseSuccess(purchase));
        dispatch(getPurchasesAction());
      })
      .catch((error) => {
        // If there is an error
        dispatch(addPurchaseError(error));
      });
  };
};
