import Api from '@src/app/libs/services/api';
import {IDeceasedDocumentationResponse} from '@src/app/libs/types/reponses/deceased-documentation-response';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';
import {AxiosResponse} from 'axios';

export interface IDeceasedDocumentationPayload {
   name: string;
   morgue: IMorgueResponse | null
}


export const fetchDeceasedDocumentation = async (): Promise<IDeceasedDocumentationResponse[]> => {
   const {data} = await Api.get<IDeceasedDocumentationResponse[]>('api/deceased-documentation');
   return data;
};

export const fetchDeceasedDocumentationById = async (deceasedDocumentationId: number | undefined): Promise<IDeceasedDocumentationResponse> => {
   const {data} = await Api.get<IDeceasedDocumentationResponse>(`api/deceased-documentation/${deceasedDocumentationId}`);
   return data;
};

export const editDeceasedDocumentationById = async (deceasedDocumentationId: number | undefined, payload: IDeceasedDocumentationPayload) => {
   return await Api.put<IDeceasedDocumentationResponse>(`api/deceased-documentation/${deceasedDocumentationId}`, payload);
};


export const postDeceasedDocumentation = async (payload: IDeceasedDocumentationPayload): Promise<AxiosResponse<IDeceasedDocumentationResponse>> => {
   return await Api.post<IDeceasedDocumentationResponse>('api/deceased-documentation', payload);
};


export const deleteDeceasedDocumentation = async (deceasedDocumentationId: number): Promise<unknown> => {
   return await Api.delete<unknown>(`api/deceased-documentation/${deceasedDocumentationId}`);
};
