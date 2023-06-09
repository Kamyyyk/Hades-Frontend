import Api from '@src/app/libs/services/api';
import {IFuneralItemsResponse} from '@src/app/libs/types/reponses/funeral-items-response';
import {AxiosResponse} from 'axios';

export interface IFuneralItemsPayload {
   containerName: string;
   containerType: 'COFFIN' | 'URN' | ''
   price: number
}

export const fetchFuneralItems = async (): Promise<IFuneralItemsResponse[]> => {
   const {data} = await Api.get<IFuneralItemsResponse[]>('api/container');
   return data;
};

export const fetchFuneralItemById = async (funeralItemId: number | undefined): Promise<IFuneralItemsResponse> => {
   const {data} = await Api.get<IFuneralItemsResponse>(`api/container/${funeralItemId}`);
   return data;
};

export const editFuneralItemById = async (payload: IFuneralItemsPayload, funeralItemId: number | undefined): Promise<AxiosResponse<IFuneralItemsResponse>> => {
   return await Api.put<IFuneralItemsResponse>(`api/container/${funeralItemId}`, payload);
};

export const postFuneralItem = async (payload: IFuneralItemsPayload): Promise<AxiosResponse<IFuneralItemsResponse>> => {
   return await Api.post<IFuneralItemsResponse>('/api/container', payload);
};

export const deleteFuneralItem = async (funeralItemId: number): Promise<unknown> => {
   return await Api.delete<unknown>(`api/container/${funeralItemId}`);
};