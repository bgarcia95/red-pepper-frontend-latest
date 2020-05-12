import {
  AUTH_START,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "./../../utils/actions";
import authService from "../../../services/authService";
import Swal from "sweetalert2";

export const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (token, decodedToken) => ({
  type: AUTH_SUCCESS,
  token,
  decodedToken,
});

export const authError = (error) => ({
  type: AUTH_ERROR,
  error,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const logoutAction = () => {
  return (dispatch) => {
    authService.logout();
    dispatch(authLogout());
  };
};

export const trySignUp = () => {
  return (dispatch) => {
    const credentials = authService.trySignUp();
    if (!credentials) {
      dispatch(logoutAction());
    } else {
      dispatch(authSuccess(credentials.token, credentials.decodedToken));
    }
  };
};

export const loginAction = (user) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const credentials = await authService.login(user);
      dispatch(authSuccess(credentials.token, authService.getDecodedToken()));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Inicio de Sesión exitoso!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if (error) {
        if (error.response) {
          const errorMessage =
            error.response.status !== 400
              ? error.response.data
              : error.response.statusText;
          dispatch(authError(errorMessage));
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Credenciales incorrectas",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };
};
