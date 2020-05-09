import http from "../../../services/httpService";
import {
  GET_SUPPLIERS_START,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_ERROR,
} from "../../utils/actions";

// All GET methods
export const getSuppliersStart = () => ({
  type: GET_SUPPLIERS_START,
});

export const getSuppliersSuccess = (suppliers) => ({
  type: GET_SUPPLIERS_SUCCESS,
  suppliers,
});

export const getSuppliersError = () => ({
  type: GET_SUPPLIERS_ERROR,
});

export const getSuppliersAction = () => {
  return (dispatch) => {
    dispatch(getSuppliersStart());

    // Retrieve data from API
    http
      .get("/provider")
      .then((response) => {
        // console.log(response);
        dispatch(getSuppliersSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getSuppliersError());
      });
  };
};
