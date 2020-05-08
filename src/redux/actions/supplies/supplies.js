import axiosClient from "../../config/axios";
import {
  GET_SUPPLIES_START,
  GET_SUPPLIES_SUCCESS,
  GET_SUPPLIES_ERROR,
} from "../../utils/actions";

// All GET methods
export const getSuppliesStart = () => ({
  type: GET_SUPPLIES_START,
});

export const getSuppliesSuccess = (supplies) => ({
  type: GET_SUPPLIES_SUCCESS,
  supplies,
});

export const getSuppliesError = () => ({
  type: GET_SUPPLIES_ERROR,
});

export const getSuppliesAction = () => {
  return (dispatch) => {
    dispatch(getSuppliesStart());

    // Retrieve data from API
    axiosClient
      .get("/supply")
      .then((response) => {
        // console.log(response);
        dispatch(getSuppliesSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getSuppliesError());
      });
  };
};
