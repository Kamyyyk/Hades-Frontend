import {Dispatch, FC, MouseEvent} from 'react';
import {dictionary} from '@src/app/libs/locales/en';
import {Modal} from 'antd';

interface IConfirmModal {
   setIsConfirmModalOpen: Dispatch<boolean>
   onConfirmModalChange: (e: MouseEvent<HTMLButtonElement>) => void
   isModalOpen: boolean;
}

export const ConfirmModal: FC<IConfirmModal> = ({setIsConfirmModalOpen, onConfirmModalChange, isModalOpen}) => {

   return (
      <Modal
         open={isModalOpen}
         onOk={onConfirmModalChange}
         onCancel={() => setIsConfirmModalOpen(false)}
      >
         <p>{dictionary.common.confirmDeleteMessage}</p>
      </Modal>
   );
};