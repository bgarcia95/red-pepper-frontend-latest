import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_SUCCESS,
} from "redux/utils/actions";

const tokenDefaultState = {
  token: null,
  // currentUserToken: null,
  decodedToken: null,
  error: null,
  isLogging: false,
  isLoggingOut: false,
};

export default (state = tokenDefaultState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        isLogging: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        // currentUserToken: action.currentUserToken,
        decodedToken: action.decodedToken,
        error: null,
        isLogging: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: true,
        isLogging: false,
      };
    case AUTH_LOGOUT_START:
      return {
        ...state,
        isLoggingOut: true,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        currentUserToken: null,
        decodedToken: null,
        isLoggingOut: false,
      };
    case AUTH_LOGOUT_ERROR:
      return {
        ...state,
        token: null,
        currentUserToken: null,
        decodedToken: null,
        isLoggingOut: false,
      };
    // case SET_MAIN_USER_TOKEN_START:
    //   return {
    //     ...state,
    //     error: null,
    //   };
    // case SET_MAIN_USER_TOKEN_SUCCESS:
    //   return {
    //     ...state,
    //     currentUserToken: action.currentUserToken,
    //   };
    default:
      return state;
  }
};
