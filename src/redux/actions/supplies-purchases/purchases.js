import http from "../../../services/httpService";
import {
  GET_PURCHASES_START,
  GET_PURCHASES_SUCCESS,
  GET_PURCHASES_ERROR,
} from "../../utils/actions";

// All GET methods
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
