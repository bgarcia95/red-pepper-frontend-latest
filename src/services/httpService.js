import axios from "axios";
import { REACT_APP_SERVER_URL } from "../utils/constants";

const httpService = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

const setJwt = (jwt) => {
  httpService.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
};

export default {
  get: httpService.get,
  post: httpService.post,
  put: httpService.put,
  delete: httpService.delete,
  setJwt,
};
