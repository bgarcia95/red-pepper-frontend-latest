import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  // SET_MAIN_USER_TOKEN_START,
  // SET_MAIN_USER_TOKEN_SUCCESS,
} from "../../utils/actions";

const tokenDefaultState = {
  token: null,
  // currentUserToken: null,
  decodedToken: null,
  error: null,
};

export default (state = tokenDefaultState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        // currentUserToken: action.currentUserToken,
        decodedToken: action.decodedToken,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        currentUserToken: null,
        decodedToken: null,
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
