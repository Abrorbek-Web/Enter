import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { getAccessToken } from "./tokenService";
import { signOut } from "../slice/authSlice";
import { store } from "../store";

// Create an instance of axios with a base URL
const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_KEY,
});

// Intercept requests to include the Authorization header if a token is available
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const token = getAccessToken();

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle specific status codes, like 403 (Forbidden)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 403) {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
