import axios from "axios";
import {
  handleResponse,
  handleError,
  setAuthorizationHeader,
} from "./interceptors";

const API_HOST = "";

/**
 * For requests which doesn't need Authorization header
 */
const http_noauth = axios.create({
  baseURL: API_HOST,
});

const http = axios.create({
  baseURL: API_HOST,
});

http_noauth.interceptors.response.use(handleResponse, handleError);
http.interceptors.request.use(setAuthorizationHeader);
http.interceptors.response.use(handleResponse, handleError);

export { http_noauth, http };
