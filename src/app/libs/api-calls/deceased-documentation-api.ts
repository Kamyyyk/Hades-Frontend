import Api from '@src/app/libs/services/api';
import {IDeceasedDocumentationResponse} from '@src/app/libs/types/reponses/deceased-documentation-response';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';

export interface IDeceasedDocumentationPayload {
   name: string;
   morgue: IMorgueResponse | null
}


export const fetchDeceasedDocumentation = async (): Promise<IDeceasedDocumentationResponse[]> => {
   const {data} = await Api.get<IDeceasedDocumentationResponse[]>('api/deceased-documentation');
   return data;
};


export const postDeceasedDocumentation = async (payload: IDeceasedDocumentationPayload): Promise<any> => {
   return await Api.post('api/deceased-documentation', payload);
};


export const deleteDeceasedDocumentation = async (deceasedDocumentationId: number): Promise<any> => {
   return await Api.delete(`api/deceased-documentation/${deceasedDocumentationId}`);
};
