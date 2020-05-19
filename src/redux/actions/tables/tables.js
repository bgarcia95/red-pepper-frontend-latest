import http from "../../../services/httpService";
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
} from "../../utils/actions";
import Swal from "sweetalert2";

// All GET methods
export const getTablesStart = () => ({
  type: GET_TABLES_START,
});

export const getTablesSuccess = (tables) => ({
  type: GET_TABLES_SUCCESS,
  tables,
});

export const getTablesError = () => ({
  type: GET_TABLES_ERROR,
});

export const getTablesAction = () => {
  return (dispatch) => {
    dispatch(getTablesStart());

    // Retrieve data from API
    http
      .get("/Table")
      .then((response) => {
        dispatch(getTablesSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getTablesError());
      });
  };
};

// ALL POST METHODS

export const addTableStart = () => ({
  type: ADD_TABLE_START,
});

export const addTableSuccess = (table) => ({
  type: ADD_TABLE_SUCCESS,
  table,
});

export const addTableError = (error) => ({
  type: ADD_TABLE_ERROR,
  error,
});

export const addTableAction = (table) => {
  return (dispatch) => {
    dispatch(addTableStart());

    // Insert into db
    http
      .post("/Table", table)
      .then((response) => {
        dispatch(addTableSuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "La mesa fue guardada satisfactoriamente",
          "success"
        );
        dispatch(getTablesAction());
      })
      .catch((error) => {
        dispatch(addTableError(error));
      });
  };
};

// ALL PUT (PATCH) METHODS

export const updateTableStart = () => ({
  type: UPDATE_TABLE_START,
});

export const updateTableSuccess = (table) => ({
  type: UPDATE_TABLE_SUCCESS,
  table,
});

export const updateTableError = (error) => ({
  type: UPDATE_TABLE_ERROR,
  error,
});

export const updateTableAction = (table) => {
  return (dispatch) => {
    dispatch(updateTableStart());

    http
      .put("/Table", table)
      .then((response) => {
        dispatch(updateTableSuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "La mesa fue actualizada satisfactoriamente",
          "success"
        );
        dispatch(getTablesAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateTableError(error));
      });
  };
};

// ALL DELETE METHODS

export const deleteTableStart = () => ({
  type: DELETE_TABLE_START,
});

export const deleteTableSuccess = (id) => ({
  type: DELETE_TABLE_SUCCESS,
  id,
});

export const deleteTableError = (error) => ({
  type: DELETE_TABLE_ERROR,
  error,
});
export const deleteTableAction = (id) => {
  return (dispatch) => {
    http
      .delete(`/Table/${id}`)
      .then((response) => {
        dispatch(deleteTableSuccess(response.data.id));
        dispatch(getTablesAction());
      })
      .catch((error) => {
        dispatch(deleteTableError(error));
      });
  };
};
