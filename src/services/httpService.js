import axios from "axios";
import { REACT_APP_SERVER_URL } from "../utils/constants";

const httpService = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

export default httpService;
