import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';

export default class Api {
   static instance: Api;
   axios: AxiosInstance;
   token = '';

   constructor() {
      const axiosConfig = {baseURL: 'http://localhost:8080'};
      this.axios = axios.create(axiosConfig);
   }

   static getInstance(): Api {
      if (Api.instance === undefined) {
         Api.instance = new Api();
      }

      return Api.instance;
   }

   request<T>(config: AxiosRequestConfig): AxiosPromise<T> {
      const newConfig = { ...config };
      newConfig.headers = {
         ...newConfig.headers,
         Authorization: `Basic ${this.token}`,
         'Content-Type': 'application/json'
      };

      return this.axios(newConfig);
   }

   static get<T>(url: string, data?: unknown): AxiosPromise<T> {
      return Api.getInstance().request<T>({
         method: 'GET',
         url,
         data,
      });
   }

   static post<T>(url: string, data?: unknown): AxiosPromise<T> {
      return Api.getInstance().request<T>({
         method: 'POST',
         url,
         data,
      });
   }

   static delete<T>(url: string, data?: unknown): AxiosPromise<T> {
      return Api.getInstance().request<T>({
         method: 'DELETE',
         url,
         data
      });
   }

   static put<T>(url: string, data?: unknown): AxiosPromise<T> {
      return Api.getInstance().request<T>({
         method: 'PUT',
         url,
         data
      });
   }
}