import { store } from "@/store";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://103.82.132.143:8080";
const LOG_ERRORS = false;
const LOG_REQUESTS = true;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request
axiosInstance.interceptors.request.use((config) => {
  if (LOG_REQUESTS) {
    console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data,
    });
  }
  return config;
}, (error) => {
  if (LOG_ERRORS) {
    console.error('[Axios Request Error]', error);
  }
  return Promise.reject(error);
});

// Interceptor response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (LOG_ERRORS) {
        console.error(`[Axios ${error.response.status}]`, error.response.data);
      }

      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
        raw: error,
      });
    }

    if (LOG_ERRORS) {
      console.error("[Axios Network Error]", error.message);
    }

    return Promise.reject({
      status: null,
      message: error.message || "Network error",
      raw: error,
    });
  }
);

// Thêm token
const withAuthHeader = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  const token = store.getState().persistent.auth.token;
  return {
    ...config,
    headers: {
      ...config?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

// Export các hàm gọi API
export const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, {
    ...withAuthHeader(config),
    params: config?.params,
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat",
          skipNulls: true,
        }),
    },
  });

export const apiPost = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => axiosInstance.post<T>(url, data, withAuthHeader(config));

export const apiPut = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => axiosInstance.put<T>(url, data, withAuthHeader(config));

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.delete<T>(url, withAuthHeader(config));

export const apiPatch = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => axiosInstance.patch<T>(url, data, withAuthHeader(config));
