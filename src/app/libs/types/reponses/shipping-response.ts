import {ICaravanResponse} from '@src/app/libs/types/reponses/caravan-response';

export interface IShippingResponse {
   id: number;
   caravan: ICaravanResponse
}