import http from "../../../services/httpService";
import {
  GET_SUPPLIERS_START,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_ERROR,
  ADD_SUPPLIER_START,
  ADD_SUPPLIER_ERROR,
  ADD_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_START,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_ERROR,
  DELETE_SUPPLIER_START,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_ERROR,
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

// ALL POST METHODS

export const addSupplierStart = () => ({
  type: ADD_SUPPLIER_START,
});

export const addSupplierSuccess = (supplier) => ({
  type: ADD_SUPPLIER_SUCCESS,
  supplier,
});

export const addSupplierError = (error) => ({
  type: ADD_SUPPLIER_ERROR,
  error,
});

export const addSupplierAction = (supplier) => {
  return (dispatch) => {
    dispatch(addSupplierStart());

    // Insert into db
    http
      .post("/provider", supplier)
      .then((response) => {
        dispatch(addSupplierSuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "El proveedor fue guardado satisfactoriamente",
          "success"
        );
        dispatch(getSuppliersAction());
      })
      .catch((error) => {
        dispatch(addSupplierError(error));
      });
  };
};

// ALL PUT (PATCH) METHODS

export const updateSupplierStart = () => ({
  type: UPDATE_SUPPLIER_START,
});

export const updateSupplierSuccess = (supplier) => ({
  type: UPDATE_SUPPLIER_SUCCESS,
  supplier,
});

export const updateSupplierError = (error) => ({
  type: UPDATE_SUPPLIER_ERROR,
  error,
});

export const updateSupplierAction = (supplier) => {
  return (dispatch) => {
    dispatch(updateSupplierStart());

    http
      .put("/provider", supplier)
      .then((response) => {
        dispatch(updateSupplierSuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "El proveedor fue actualizado satisfactoriamente",
          "success"
        );
        dispatch(getSuppliersAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateSupplierError(error));
      });
  };
};

// ALL DELETE METHODS

export const deleteSupplierStart = () => ({
  type: DELETE_SUPPLIER_START,
});

export const deleteSupplierSuccess = (id) => ({
  type: DELETE_SUPPLIER_SUCCESS,
  id,
});

export const deleteSupplierError = (error) => ({
  type: DELETE_SUPPLIER_ERROR,
  error,
});
export const deleteSupplierAction = (id) => {
  return (dispatch) => {
    http
      .delete(`/provider?id=${id}`)
      .then((response) => {
        dispatch(deleteSupplierSuccess(response.data.id));
        dispatch(getSuppliersAction());
      })
      .catch((error) => {
        dispatch(deleteSupplierError(error));
      });
  };
};
