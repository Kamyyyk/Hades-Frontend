import {Modal} from 'antd';

interface IConfirmModal {
   setIsConfirmModalOpen: React.Dispatch<boolean>
   onConfirmModalChange: (e: React.MouseEvent<HTMLButtonElement>) => void
   isModalOpen: boolean;
}

export const ConfirmModal: React.FC<IConfirmModal> = ({setIsConfirmModalOpen, onConfirmModalChange, isModalOpen}) => {

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