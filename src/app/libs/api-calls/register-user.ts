import {TUserPayload} from '@src/app/libs/api-calls/user-api';
import Api from '@src/app/libs/services/api';
import {AxiosResponse} from 'axios';

export const registerUser = async (payload: TUserPayload): Promise<AxiosResponse<TUserPayload>> => {
   return await Api.post('api/auth/register', payload);
};