import Api from '@src/app/libs/services/api';
import {ILoginForm} from '@src/app/libs/types/login-form';
import { ILoginResponse } from '@src/app/libs/types/reponses/login-response';


export const login = async (payload: ILoginForm): Promise<ILoginResponse> => {
   const {data} = await Api.post<ILoginResponse>('auth/login', payload);
   return data;
};