import Api from '@src/app/libs/services/api';
import {ICemeteryResponse} from '@src/app/libs/types/reponses/cemetery-response';

export interface ICemeteryPayload {
   cemeteryName: string;
   address: string;
}


export const fetchCemeteries = async (): Promise<ICemeteryResponse[]> => {
   const {data} = await Api.get<ICemeteryResponse[]>('/api/place-on-cemetery');
   return data;
};

export const postCemetery = async (payload: ICemeteryPayload ): Promise<any> => {
   return await Api.post<ICemeteryPayload>('/api/place-on-cemetery', payload);
};


export const deleteCemetery = async (cemeteryId: number): Promise<any> => {
   return await Api.delete(`/api/place-on-cemetery/${cemeteryId}`);
};