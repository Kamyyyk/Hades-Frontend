import Api from '@src/app/libs/services/api';
import {ICemeteryResponse} from '@src/app/libs/types/reponses/cemetery-response';
import {AxiosResponse} from 'axios';

export interface ICemeteryPayload {
   cemeteryName: string;
   address: string;
   price: number;
}


export const fetchCemeteries = async (): Promise<ICemeteryResponse[]> => {
   const {data} = await Api.get<ICemeteryResponse[]>('/api/place-on-cemetery');
   return data;
};

export const fetchCemeteryById = async (cemeteryId: number | undefined): Promise<ICemeteryResponse> => {
   const {data} = await Api.get<ICemeteryResponse>(`api/place-on-cemetery/${cemeteryId}`);
   return data;
};

export const postCemetery = async (payload: ICemeteryPayload ): Promise<AxiosResponse<ICemeteryResponse>> => {
   return await Api.post<ICemeteryResponse>('/api/place-on-cemetery', payload);
};

export const editCemetery = async (payload: ICemeteryPayload, cemeteryId: number | undefined): Promise<AxiosResponse<ICemeteryResponse>> => {
   return await Api.put<ICemeteryResponse>(`api/place-on-cemetery/${cemeteryId}`, payload);
};


export const deleteCemetery = async (cemeteryId: number): Promise<unknown> => {
   return await Api.delete<unknown>(`/api/place-on-cemetery/${cemeteryId}`);
};