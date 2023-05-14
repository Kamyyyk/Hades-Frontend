import {IDriver} from '@src/app/administrator/drivers-view/drivers-view';
import Api from '@src/app/libs/services/api';
import {ICaravanResponse} from '@src/app/libs/types/reponses/caravan-response';

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

export const postCaravan = async (payload: ICaravanPayload): Promise<any> => {
   return await Api.post<ICaravanPayload>('api/caravan', payload);
};

export const deleteCaravan = async (caravanId: number): Promise<any> => {
   return await Api.delete<number>(`api/caravan/${caravanId}`);
};