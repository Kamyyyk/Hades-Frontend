import type { FC } from 'react';
import {Dispatch} from 'react';
import {TSelectField} from '@src/app/libs/components/form/select-field';

export interface IEditUserForm {
   setIsEditModalOpen: Dispatch<boolean>
   refetch: () => void
   userId: number | undefined
   roleTypeOptions: TSelectField[]
}

export const EditUserForm: FC<IEditUserForm> = ({setIsEditModalOpen, refetch, userId, roleTypeOptions}) => {
   return (
      <h1>EditUserForm</h1>
   );
};