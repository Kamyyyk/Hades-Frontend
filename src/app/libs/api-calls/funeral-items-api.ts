import Api from '@src/app/libs/services/api';
import {IFuneralItemsResponse} from '@src/app/libs/types/reponses/funeral-items-response';

export interface IFuneralItemsPayload {
   containerName: string;
   containerType: 'COFFIN' | 'URN' | ''
}

export const fetchFuneralItems = async (): Promise<IFuneralItemsResponse[]> => {
   const {data} = await Api.get<IFuneralItemsResponse[]>('api/container');
   return data;
};

export const postFuneralItem = async (payload: IFuneralItemsPayload): Promise<any> => {
   return await Api.post<any>('/api/container', payload);
};

export const deleteFuneralItem = async (funeralItemId: number): Promise<any> => {
   return await Api.delete(`api/container/${funeralItemId}`);
};