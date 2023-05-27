import {ICemeteryPayload} from '@src/app/libs/api-calls/cemetery-api';
import {IFuneralItemsPayload} from '@src/app/libs/api-calls/funeral-items-api';
import {IMorguePayload} from '@src/app/libs/api-calls/morgue';
import {IShippingPayload} from '@src/app/libs/api-calls/shipping-api';
import Api from '@src/app/libs/services/api';
import {IFuneralResponse} from '@src/app/libs/types/reponses/funeral-response';
import {AxiosResponse} from 'axios';

export interface IFuneralPayload {
   funeralDate: string;
   status: 'OPEN' | 'FINISHED' | 'IN_PROGRESS' | '';
   price: number | null;
   morgue: IMorguePayload | null;
   container: IFuneralItemsPayload | null;
   shipping: IShippingPayload | null
   placeOnCemetery: ICemeteryPayload | null;
}

export const fetchFunerals = async (): Promise<IFuneralResponse[]> => {
   const {data} = await Api.get<IFuneralResponse[]>('api/funeral');
   return data;
};

export const fetchFuneralById = async (funeralId: string | number | undefined): Promise<IFuneralResponse> => {
   const {data} = await Api.get<IFuneralResponse>(`api/funeral/${funeralId}`);
   return data;
};

export const postFuneral = async (payload: IFuneralPayload): Promise<IFuneralResponse> => {
   const {data} = await Api.post<IFuneralResponse>('api/funeral', payload);
   return data;
};

export const editFuneralById = async (payload: IFuneralPayload, funeralId: number | undefined): Promise<AxiosResponse<IFuneralResponse>> => {
   return await Api.put<IFuneralResponse>(`api/funeral/${funeralId}`, payload);
};

export const deleteFuneralById = async (funeralId: number): Promise<unknown> => {
   return await Api.delete<unknown>(`api/funeral/${funeralId}`);
};