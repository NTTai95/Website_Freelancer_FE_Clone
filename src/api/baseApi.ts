
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://103.82.132.143:8080';

class BaseApi {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // Sample token handling - can be modified later
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('token');
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            (error) => {
                console.error('Request error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            console.error('Bad Request:', error.response.data);
                            break;
                        case 404:
                            console.error('Resource not found:', error.response.data);
                            break;
                        case 500:
                            console.error('Internal Server Error:', error.response.data);
                            break;
                        default:
                            console.error('API Error:', error.response.data);
                    }
                } else if (error.request) {
                    console.error('Network Error:', error.message);
                } else {
                    console.error('Error:', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    protected async get<T>(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.get<T>(url, config);
    }

    protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.post<T>(url, data, config);
    }

    protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.put<T>(url, data, config);
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig) {
        return this.axiosInstance.delete<T>(url, config);
    }

    protected async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axiosInstance.patch<T>(url, data, config);
    }
}

export default BaseApi;
