import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
} from "../../utils/actions";

const tokenDefaultState = {
  token: null,
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
        decodedToken: action.decodedToken,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        decodedToken: null,
      };
    default:
      return state;
  }
};
