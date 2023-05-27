import Api from '@src/app/libs/services/api';
import { ILoginResponse } from '@src/app/libs/types/reponses/login-response';

export type TLoginPayload = {
   username: string;
   password: string;
}

export const login = async (payload: TLoginPayload): Promise<ILoginResponse> => {
   const {data} = await Api.post<ILoginResponse>('api/auth/login', payload);
   return data;
};