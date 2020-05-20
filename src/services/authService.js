import http from "services/httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/authentication";
const tokenKey = "token";
// const userToken = "user";

export const login = async (user) => {
  const { data: credentials } = await http.post(`${apiEndpoint}`, user);
  if (credentials) {
    localStorage.setItem(tokenKey, credentials.token);
    // setCurrentUserToken(credentials.token);
    http.setJwt(getJwt());
  }
  return credentials;
};

export const trySignUp = () => {
  let credentials;
  try {
    // Obtener el token
    const token = getJwt();
    if (token) {
      const decodedToken = getDecodedToken();
      // const currentUserToken = getCurrentUserToken();
      credentials = {
        token,
        decodedToken,
        // currentUserToken,
      };
      // To check when refreshing the page if token exists
      http.setJwt(getJwt());
    }
  } catch (error) {
    console.log(error);
  }
  return credentials;
};

const getLocalStorageItem = (key) => localStorage.getItem(key);

export const getJwt = () => getLocalStorageItem(tokenKey);

export const getDecodedToken = () => {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

// For trySignUp (triggered when refreshing the page and checking if token exists)
// export const getCurrentUserToken = () => {
//   try {
//     return getLocalStorageItem(userToken);
//   } catch (error) {
//     return null;
//   }
// };

// export const setCurrentUserToken = (userToken) => {
//   localStorage.setItem(userToken, userToken);
// };

export const logout = () => {
  localStorage.removeItem(tokenKey);
  // localStorage.removeItem(userToken);
};

export default {
  getJwt,
  getDecodedToken,
  trySignUp,
  login,
  logout,
  // setCurrentUserToken,
};
