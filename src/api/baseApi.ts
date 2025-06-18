import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { store } from '@/store';

const baseURL = process.env.NEXT_PUBLIC_API_URL || /*'http://localhost:8080'*/ 'http://103.82.132.143:8080';
const LOG_ERRORS = false;

// Tạo một axios instance duy nhất
const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: interceptor chỉ xử lý lỗi, KHÔNG gắn token
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
            console.error('[Axios Network Error]', error.message);
        }

        return Promise.reject({
            status: null,
            message: error.message || 'Network error',
            raw: error,
        });
    }
);

// ✅ Hàm tiện ích để thêm token mới nhất vào config
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

// ✅ Export các phương thức gọi API sử dụng header có token
export const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, withAuthHeader(config));

export const apiPost = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, withAuthHeader(config));

export const apiPut = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, withAuthHeader(config));

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, withAuthHeader(config));

export const apiPatch = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, withAuthHeader(config));
