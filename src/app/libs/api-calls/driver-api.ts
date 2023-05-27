import Api from '@src/app/libs/services/api';
import {IDriverResponse} from '@src/app/libs/types/reponses/driver-response';
import {AxiosResponse} from 'axios';


export type TDriverPayload = {
   name: string;
   surname: string
}

export const fetchDrivers =  async (): Promise<IDriverResponse[]> => {
   const {data} = await Api.get<IDriverResponse[]>('api/driver');
   return data;
};

export const fetchDriverById = async (driverId: number | undefined): Promise<IDriverResponse> => {
   const {data} = await Api.get<IDriverResponse>(`api/driver/${driverId}`);
   return data;
};

export const postDriver = async (payload: TDriverPayload): Promise<AxiosResponse<IDriverResponse>> => {
   return await Api.post('api/driver', payload);
};

export const editDriverById = async (payload: TDriverPayload, driverId: number | undefined): Promise<AxiosResponse<IDriverResponse>> => {
   return await Api.put<IDriverResponse>(`api/driver/${driverId}`, payload);
};

export const deleteDriver = async (driverId: number | undefined): Promise<unknown> => {
   return await Api.delete<unknown>(`api/driver/${driverId}`);
};