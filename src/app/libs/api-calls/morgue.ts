import Api from '@src/app/libs/services/api';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';
import {AxiosResponse} from 'axios';

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

export const postMorgue = async (payload: IMorguePayload): Promise<AxiosResponse<IMorgueResponse>> => {
   return await Api.post<IMorgueResponse>('api/morgue', payload);
};

export const deleteMorgue = async (morgueId: number): Promise<unknown> => {
   return await Api.delete<unknown>(`api/morgue/${morgueId}`);
};