import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/authentication";
const tokenKey = "token";

export const login = async (user) => {
  const { data: credentials } = await http.post(`${apiEndpoint}`, user);
  if (credentials) {
    localStorage.setItem(tokenKey, credentials.token);
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
      credentials = {
        token,
        decodedToken,
      };
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

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export default {
  getJwt,
  getDecodedToken,
  trySignUp,
  login,
  logout,
};
