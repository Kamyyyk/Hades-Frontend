import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';

export default class Api {
   static instance: Api;
   axios: AxiosInstance;
   token = '';

   constructor() {
      const axiosConfig = {baseURL: 'localhost'};
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

}
export const client = axios.create({
   baseURL: 'http://localhost:8080'
});