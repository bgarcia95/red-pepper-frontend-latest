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

// Default state
const employeesDefaultState = {
  employees: [],
  isLoading: true,
  error: null,
  isProcessing: false,
  isFetching: false,
};

export default (state = employeesDefaultState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.employees,
        isLoading: false,
        error: false,
        isFetching: false,
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        error: true,
      };
    case ADD_EMPLOYEE_START:
      return {
        ...state,
        error: null,
        isProcessing: true,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.employee],
        error: null,
        isProcessing: false,
      };

    case ADD_EMPLOYEE_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };

    case UPDATE_EMPLOYEE_START:
      return {
        ...state,
        isProcessing: true,
        error: null,
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        error: null,
        employees: state.employees.map((employee) =>
          employee.id === action.employee.id
            ? (employee = action.employee)
            : employee
        ),
        isProcessing: false,
      };
    case UPDATE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: true,
        isProcessing: false,
      };
    case DELETE_EMPLOYEE_START:
      return {
        ...state,
        error: null,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        error: null,
        employees: state.employees.filter(({ id }) => id !== action.id),
      };
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
