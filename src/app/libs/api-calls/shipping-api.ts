import Api from '@src/app/libs/services/api';
import {ICaravanResponse} from '@src/app/libs/types/reponses/caravan-response';
import {IShippingResponse} from '@src/app/libs/types/reponses/shipping-response';
import {AxiosResponse} from 'axios';

export interface IShippingPayload {
   name: string;
   caravan: ICaravanResponse | null
   distance: number,
   price: number
}

export const fetchShipping = async (): Promise<IShippingResponse[]> => {
   const {data} = await Api.get<IShippingResponse[]>('api/shipping');
   return data;
};

export const fetchShippingById = async (shippingId: number| undefined): Promise<IShippingResponse> => {
   const {data} = await Api.get<IShippingResponse>(`api/shipping/${shippingId}`);
   return data;
};

export const editShippingById = async (shippingId: number | undefined, payload: IShippingPayload): Promise<AxiosResponse<IShippingResponse>> => {
   return await Api.put<IShippingResponse>(`api/shipping/${shippingId}`, payload);
};

export const postShipping = async (payload: IShippingPayload): Promise<AxiosResponse<IShippingResponse>> => {
   return await Api.post<IShippingResponse>('api/shipping', payload);
};
export const deleteShipping = async (shippingId: number): Promise<unknown> => {
   return Api.delete<unknown>(`api/shipping/${shippingId}`);
};