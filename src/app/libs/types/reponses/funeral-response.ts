import {IFuneralItemsPayload} from '@src/app/libs/api-calls/funeral-items-api';
import {ICemeteryResponse} from '@src/app/libs/types/reponses/cemetery-response';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';
import {IShippingResponse} from '@src/app/libs/types/reponses/shipping-response';

export interface IFuneralResponse {
   id: number
   funeralDate: string;
   status: 'OPEN' | 'FINISHED' | 'IN_PROGRESS' | '';
   price: number;
   morgue: IMorgueResponse;
   container: IFuneralItemsPayload;
   shipping: IShippingResponse
   placeOnCemetery: ICemeteryResponse;
}