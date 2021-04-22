import axios from "axios";

const httpService = axios.create({
  baseURL: `http://192.168.1.3:5000/api`, // enter local ip address
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
