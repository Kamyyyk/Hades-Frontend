import {Dispatch, FC, MouseEvent} from 'react';
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
         <p>Are you sure you want to delete this position?</p>
      </Modal>
   );
};