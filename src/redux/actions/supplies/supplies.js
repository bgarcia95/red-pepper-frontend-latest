import http from "../../../services/httpService";
import {
  GET_SUPPLIES_START,
  GET_SUPPLIES_SUCCESS,
  GET_SUPPLIES_ERROR,
  ADD_SUPPLY_START,
  ADD_SUPPLY_ERROR,
  ADD_SUPPLY_SUCCESS,
} from "../../utils/actions";
import Swal from "sweetalert2";

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
    http
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

// ALL POST METHODS

export const addSupplyStart = () => ({
  type: ADD_SUPPLY_START,
});

export const addSupplySuccess = (supply) => ({
  type: ADD_SUPPLY_SUCCESS,
  supply,
});

export const addSupplyError = (error) => ({
  type: ADD_SUPPLY_ERROR,
  error,
});

export const addSupplyAction = (supply) => {
  return (dispatch) => {
    dispatch(addSupplyStart());

    // Insert into db
    http
      .post("/supply", supply)
      .then((response) => {
        dispatch(addSupplySuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "El insumo fue guardado satisfactoriamente",
          "success"
        );
        dispatch(getSuppliesAction());
      })
      .catch((error) => {
        dispatch(addSupplyError(error));
      });
  };
};
