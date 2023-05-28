import Api from '@src/app/libs/services/api';
import {TUserResponse} from '@src/app/libs/types/reponses/user-reponse';
import {AxiosResponse} from 'axios';

export type TUserPayload = {
   username: string;
   password: string;
   role: 'ADMINISTRATOR' | 'FUNERAL_MORGUE_WORKER' | 'FUNERAL_HOME_EMPLOYEE'
}

export const getUsers = async (): Promise<TUserResponse[]> => {
   const {data} = await Api.get<TUserResponse[]>('api/user');
   return data;
};

export const getUserById = async (userId: number | undefined): Promise<TUserResponse> => {
   const {data} = await Api.get<TUserResponse>(`api/user/${userId}`);
   return data;
};

export const editUser = async (payload: TUserPayload, userid: number | undefined): Promise<AxiosResponse<TUserResponse>> => {
   return await Api.put<TUserResponse>(`api/user/${userid}`, payload);
};

export const deleteUser = async (userId: number | undefined): Promise<unknown> => {
   return await Api.delete<unknown>(`api/user/${userId}`);
};