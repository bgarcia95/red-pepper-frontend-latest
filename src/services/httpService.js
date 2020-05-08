import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const httpService = axios.create({
  baseURL: SERVER_URL,
});

export default httpService;
