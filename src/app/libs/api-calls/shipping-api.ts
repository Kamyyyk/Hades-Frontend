import Api from '@src/app/libs/services/api';
import {ICaravanResponse} from '@src/app/libs/types/reponses/caravan-response';
import {IShippingResponse} from '@src/app/libs/types/reponses/shipping-response';

export interface IShippingPayload {
   name: string;
   caravan: ICaravanResponse | null
}

export const fetchShipping = async (): Promise<IShippingResponse[]> => {
   const {data} = await Api.get<IShippingResponse[]>('api/shipping');
   return data;
};

export const postShipping = async (payload: IShippingPayload): Promise<any> => {
   return Api.post<IShippingPayload>('api/shipping', payload );
};
export const deleteShipping = async (shippingId: number): Promise<any> => {
   return Api.delete(`api/shipping/${shippingId}`);
};