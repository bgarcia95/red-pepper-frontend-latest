import http from "services/httpService";
import {
  GET_EMPLOYEES_START,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  ADD_EMPLOYEE_START,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_START,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_START,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
} from "redux/utils/actions";
import Swal from "sweetalert2";

// All GET methods
export const getEmployeesStart = () => ({
  type: GET_EMPLOYEES_START,
});

export const getEmployeesSuccess = (employees) => ({
  type: GET_EMPLOYEES_SUCCESS,
  employees,
});

export const getEmployeesError = (error) => ({
  type: GET_EMPLOYEES_ERROR,
  error,
});

export const getEmployeesAction = () => {
  return (dispatch) => {
    dispatch(getEmployeesStart());

    // Retrieve data from API
    http
      .get("/employees")
      .then((response) => {
        dispatch(getEmployeesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getEmployeesError(error));
      });
  };
};

// ALL POST METHODS

export const addEmployeeStart = () => ({
  type: ADD_EMPLOYEE_START,
});

export const addEmployeeSuccess = (category) => ({
  type: ADD_EMPLOYEE_SUCCESS,
  category,
});

export const addEmployeeError = (error) => ({
  type: ADD_EMPLOYEE_ERROR,
  error,
});

export const addEmployeeAction = (employee) => {
  return (dispatch) => {
    dispatch(addEmployeeStart());

    // Insert into db
    http
      .post("/employees", employee)
      .then((response) => {
        dispatch(addEmployeeSuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "El empleado fue guardado satisfactoriamente",
          "success"
        );
        dispatch(getEmployeesAction());
      })
      .catch((error) => {
        dispatch(addEmployeeError(error));
      });
  };
};

// ALL PUT (PATCH) METHODS

export const updateEmployeeStart = () => ({
  type: UPDATE_EMPLOYEE_START,
});

export const updateEmployeeSuccess = (employee) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  employee,
});

export const updateEmployeeError = (error) => ({
  type: UPDATE_EMPLOYEE_ERROR,
  error,
});

export const updateEmployeeAction = (employee) => {
  return (dispatch) => {
    dispatch(updateEmployeeStart());

    http
      .put("/employees", employee)
      .then((response) => {
        dispatch(updateEmployeeSuccess(response.data));
        Swal.fire(
          "¡Guardado!",
          "El empleado fue actualizado satisfactoriamente",
          "success"
        );
        dispatch(getEmployeesAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateEmployeeError(error));
      });
  };
};

// ALL DELETE METHODS

export const deleteEmployeeStart = () => ({
  type: DELETE_EMPLOYEE_START,
});

export const deleteEmployeeSuccess = (id) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  id,
});

export const deleteEmployeeError = (error) => ({
  type: DELETE_EMPLOYEE_ERROR,
  error,
});
export const deleteEmployeeAction = (id) => {
  return (dispatch) => {
    http
      .delete(`employees?id=${id}`)
      .then((response) => {
        dispatch(deleteEmployeeSuccess(response.data.id));
        dispatch(getEmployeesAction());
      })
      .catch((error) => {
        dispatch(deleteEmployeeError(error));
      });
  };
};
