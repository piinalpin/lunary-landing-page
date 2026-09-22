import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';
import { env } from '@/utils/env';

/**
 * Custom Axios Client with interceptors and structured error handling
 */
export class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: env.apiBaseUrl,
      timeout: env.apiTimeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (env.isDev) {
          console.debug(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data || '');
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (env.isDev) {
          console.debug(`[API Response] ${response.status} ${response.config.url}`, response.data);
        }
        return response;
      },
      (error: AxiosError) => {
        if (env.isDev) {
          console.warn(`[API Error] ${error.config?.url}:`, error.message, error.response?.data);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Generic GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  /**
   * Helper to extract friendly error message
   */
  formatError(error: unknown): string {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        return error.response.data.message;
      }
      if (error.code === 'ECONNABORTED') {
        return 'Koneksi ke server timeout. Silakan coba beberapa saat lagi.';
      }
      if (error.code === 'ERR_NETWORK') {
        return 'Tidak dapat terhubung ke server backend. Periksa koneksi atau status server.';
      }
      if (error.response?.status === 404) {
        return 'Layanan atau endpoint tidak ditemukan (404).';
      }
      if (error.response?.status && error.response.status >= 500) {
        return 'Terjadi kendala pada server backend (500).';
      }
      return error.message;
    }
    return error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak terduga.';
  }
}

export const apiClient = new ApiClient();

