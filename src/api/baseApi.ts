import { store } from "@/store";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";
// const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const LOG_ERRORS = false;
const LOG_REQUESTS = true;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
});

// Interceptor request
axiosInstance.interceptors.request.use(
  (config) => {
    if (LOG_REQUESTS) {
      console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
        headers: config.headers?.toJSON?.() || config.headers,
      });
    }
    return config;
  },
  (error) => {
    if (LOG_ERRORS) {
      console.error("[Axios Request Error]", error);
    }
    return Promise.reject(error);
  }
);

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

// Hàm thêm token và xác định header phù hợp
const generateRequestConfig = (
  config?: AxiosRequestConfig,
  data?: any
): AxiosRequestConfig => {
  const token = store.getState().persistent.auth.token;
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

  const headers: Record<string, any> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  } else {
    console.log("FormData:", data);
    for (const [key, value] of data.entries()) {
      console.log("FormData:", key, value);
    }
  }

  return {
    ...config,
    headers,
  };
};

// Hàm giúp serialize params với qs
const defaultParamsSerializer = (params: any) =>
  qs.stringify(params, { arrayFormat: "repeat", skipNulls: true });

// Export các hàm gọi API
export const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, {
    ...generateRequestConfig(config),
    params: config?.params,
    paramsSerializer: { serialize: defaultParamsSerializer },
  });

export const apiPost = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  axiosInstance.post<T>(url, data, generateRequestConfig(config, data));

export const apiPut = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  axiosInstance.put<T>(url, data, generateRequestConfig(config, data));

export const apiPatch = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  axiosInstance.patch<T>(url, data, generateRequestConfig(config, data));

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.delete<T>(url, generateRequestConfig(config));
