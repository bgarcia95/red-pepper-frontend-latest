import axios from "axios";

const httpService = axios.create({
<<<<<<< HEAD
  baseURL: `http://192.168.1.9:5000/api`, // enter local ip address
=======
  baseURL: `https://192.168.1.9:5000/api`, // enter local ip address
>>>>>>> b8a9c2b7819beeba382ea3c46614c644413a1929
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
