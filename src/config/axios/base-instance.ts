import axios from "axios";

import {
  transformResponseInterceptor,
  transformErrorInterceptor,
} from "./interceptors";

const baseAxiosInstance = axios.create({
  baseURL: `http://localhost:5000/api`,
  timeout: 5000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

baseAxiosInstance.interceptors.response.use(
  transformResponseInterceptor,
  transformErrorInterceptor
);

export default baseAxiosInstance;
