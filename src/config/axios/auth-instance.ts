import axios from "axios";

import {
  setAuthorizationHeaderRequestInterceptor,
  transformResponseInterceptor,
  transformErrorInterceptor,
} from "./interceptors";

const authAxiosInstance = axios.create({
  baseURL: `http://localhost:5000`,
  timeout: 5000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

authAxiosInstance.interceptors.request.use(
  setAuthorizationHeaderRequestInterceptor
);
authAxiosInstance.interceptors.response.use(
  transformResponseInterceptor,
  transformErrorInterceptor
);

export default authAxiosInstance;
