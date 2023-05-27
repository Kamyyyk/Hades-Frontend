import {IDriver} from '@src/app/administrator/drivers-view/drivers-view';
import Api from '@src/app/libs/services/api';
import {ICaravanResponse} from '@src/app/libs/types/reponses/caravan-response';
import {AxiosResponse} from 'axios';

export interface ICaravanPayload {
   licenceNumber: string,
   brand: string,
   model: string,
   driver: IDriver | null
}

export const fetchCaravan = async (): Promise<ICaravanResponse[]> => {
   const {data} = await Api.get<ICaravanResponse[]>('api/caravan');
   return data;
};

export const fetchCaravanById = async (caravanId: number | undefined): Promise<ICaravanResponse> => {
   const {data} = await Api.get<ICaravanResponse>(`api/caravan/${caravanId}`);
   return data;
};

export const postCaravan = async (payload: ICaravanPayload): Promise<AxiosResponse<ICaravanResponse>> => {
   return await Api.post<ICaravanResponse>('api/caravan', payload);
};

export const editCaravanById = async (payload: ICaravanPayload, caravanId: number | undefined): Promise<AxiosResponse<ICaravanResponse>> => {
   return await Api.put<ICaravanResponse>(`api/caravan/${caravanId}`, payload);
};

export const deleteCaravan = async (caravanId: number): Promise<unknown> => {
   return await Api.delete<unknown>(`api/caravan/${caravanId}`);
};