import {IDriver} from '@src/app/administrator/drivers-view/drivers-view';

export interface ICaravanResponse {
   id: number;
   licenceNumber: string;
   brand: string;
   model: string;
   driver: IDriver | null
}