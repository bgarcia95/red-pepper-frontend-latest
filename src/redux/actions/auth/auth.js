import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_SUCCESS,
  // SET_MAIN_USER_TOKEN_START,
  // SET_MAIN_USER_TOKEN_SUCCESS,
} from "redux/utils/actions";
import authService from "../../../services/authService";
import Swal from "sweetalert2";

export const authStart = () => ({
  type: AUTH_START,
});

// currentUserToken
export const authSuccess = (token, decodedToken) => ({
  type: AUTH_SUCCESS,
  token,
  // currentUserToken,
  decodedToken,
});

export const authError = (error) => ({
  type: AUTH_ERROR,
  error,
});

export const authLogoutStart = () => ({
  type: AUTH_LOGOUT_START,
});

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export const authLogOutError = () => ({
  type: AUTH_LOGOUT_ERROR,
});

// export const setMainUserTokenStart = () => ({
//   type: SET_MAIN_USER_TOKEN_START,
// });

// export const setMainUserTokenSuccess = (currentUserToken) => ({
//   type: SET_MAIN_USER_TOKEN_SUCCESS,
//   currentUserToken,
// });

export const logoutAction = () => {
  return (dispatch) => {
    authService.logout();
    dispatch(authLogoutStart());
    dispatch(authLogoutSuccess());
  };
};

export const tryAutoSignIn = () => {
  return (dispatch) => {
    const credentials = authService.tryAutoSignIn();
    if (!credentials) {
      dispatch(logoutAction());
    } else {
      dispatch(
        authSuccess(
          credentials.token,
          // credentials.currentUserToken,
          credentials.decodedToken
        )
      );
    }
  };
};

export const loginAction = (user) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const credentials = await authService.login(user);
      dispatch(
        authSuccess(
          credentials.token,
          // credentials.currentUserToken,
          authService.getDecodedToken()
        )
      );
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

// export const setMainUserToken = (currentUserToken) => {
//   return (dispatch) => {
//     dispatch(setMainUserTokenStart());
//     authService.setCurrentUserToken(currentUserToken);
//     dispatch(setMainUserTokenSuccess(currentUserToken));
//   };
// };
