import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';

export interface IDeceasedDocumentationResponse {
   id: number;
   name: string;
   morgue: IMorgueResponse
}