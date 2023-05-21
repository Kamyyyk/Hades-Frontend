import Api from '@src/app/libs/services/api';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';

export interface IMorguePayload {
   name: string;
   surname: string;
   dateArrived: string;
   sex: string;
   birthDate: string;
   deathDate: string
}


export const fetchMorgue = async (): Promise<IMorgueResponse[]> => {
   const {data} = await Api.get<IMorgueResponse[]>('api/morgue');
   return data;
};

export const postMorgue = async (payload: IMorguePayload): Promise<any> => {
   return await Api.post('api/morgue', payload);
};

export const deleteMorgue = async (morgueId: number): Promise<any> => {
   return await Api.delete(`api/morgue/${morgueId}`);
};