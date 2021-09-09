import axios from "axios";

const httpService = axios.create({
  baseURL: `https://redpepper-app.herokuapp.com/api`, // enter local ip address
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
