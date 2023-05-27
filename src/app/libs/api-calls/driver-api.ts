import Api from '@src/app/libs/services/api';
import {IDriverResponse} from '@src/app/libs/types/reponses/driver-response';

export const fetchDrivers =  async (): Promise<IDriverResponse[]> => {
   const {data} = await Api.get<IDriverResponse[]>('api/driver');
   return data;
};