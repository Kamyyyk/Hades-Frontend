import {Dispatch, FC} from 'react';
import {Modal} from 'antd';

interface IAddModal {
   isModalOpen: boolean;
   title: string;
   setIsModalOpen: Dispatch<boolean>;
   children: JSX.Element
}


export const AddOrEditModal: FC<IAddModal> = ({isModalOpen, setIsModalOpen, title, children}) => {
   return (
      <Modal
         open={isModalOpen}
         title={title}
         onCancel={() => setIsModalOpen(false)}
         footer={[]}
      >
         {children}
      </Modal>
   );
};