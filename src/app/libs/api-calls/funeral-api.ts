import {ICemeteryPayload} from '@src/app/libs/api-calls/cemetery-api';
import {IFuneralItemsPayload} from '@src/app/libs/api-calls/funeral-items-api';
import {IMorguePayload} from '@src/app/libs/api-calls/morgue';
import {IShippingPayload} from '@src/app/libs/api-calls/shipping-api';
import Api from '@src/app/libs/services/api';
import {IFuneralResponse} from '@src/app/libs/types/reponses/funeral-response';

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

export const fetchFuneralById = async (funeralId: number): Promise<IFuneralResponse> => {
   const {data} = await Api.get<IFuneralResponse>(`api/funeral/${funeralId}`);
   return data;
};

export const postFuneral = async (payload: IFuneralPayload): Promise<any> => {
   const {data} = await Api.post<IFuneralPayload>('api/funeral', payload);
   return data;
};

export const deleteFuneralById = async (funeralId: number): Promise<any> => {
   return await Api.delete(`api/funeral/${funeralId}`);
};