import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Storage from "./Storage";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use(async (config) => {
  const token = await Storage.get("token");

  if (token) config.headers = { ...config.headers, Authorization: token };

  return config;
});

class Api {
  private async base(
    request: () => Promise<AxiosResponse>
  ): Promise<[any, any]> {
    try {
      const response = await request();

      return [response.data, null];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return [null, error.response?.data];
      }

      return [null, null];
    }
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.base(() => httpClient.get(url, config));
  }

  post(url: string, payload: any, config?: AxiosRequestConfig) {
    return this.base(() => httpClient.post(url, payload, config));
  }

  put(url: string, payload: any, config?: AxiosRequestConfig) {
    return this.base(() => httpClient.put(url, payload, config));
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.base(() => httpClient.delete(url, config));
  }
}

export const api = new Api();
