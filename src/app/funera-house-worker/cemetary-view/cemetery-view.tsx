import {useEffect, useState} from 'react';
import {AddCemeteryForm} from '@src/app/funera-house-worker/cemetary-view/modal/form/add-cemetery-form';
import {deleteCemetery, fetchCemeteries} from '@src/app/libs/api-calls/cemetery-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

export interface IPlaceOnCemetery {
   id: number;
   cemeteryName: string;
   address: string;
}

export const CemeteryView: React.FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   const navigate = useNavigate();

   const {data, isError, isLoading, refetch} = useQuery({
      queryKey: ['fetchCemetery'],
      queryFn: fetchCemeteries
   });

   const {mutate, isSuccess: isDeleteCemeteryPlaceSuccess} = useMutation({
      mutationKey: ['deleteCemetery'],
      mutationFn: (cemeteryId: number) => deleteCemetery((cemeteryId))
   });
   
   const onAddButtonChange = () => {
      console.log('driver component add');
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      console.log('driver component edit', id);
   };

   const onDeleteButtonChange = (id: number) => {
      setSelectedRowKey(id);
      setIsConfirmModalOpen(true);
   };

   const handleConfirmDelete = () => {
      if (selectedRowKey) {
         try {
            mutate(selectedRowKey);
         } catch (e) {
            console.log(e);
         } finally {
            toast.success('Successfully deleted cemetery row');
            setIsConfirmModalOpen(false);
         }
      }
   };

   if (isError) {
      navigate('/error');
   }
   
   useEffect(() => {
      if (isDeleteCemeteryPlaceSuccess) {
         refetch();
      }
   }, [isDeleteCemeteryPlaceSuccess]);

   const columns: ColumnsType<IPlaceOnCemetery> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Cemetery Name',
         dataIndex: 'cemeteryName',
         key: 'cemeteryName',
      },
      {
         title: 'Cemetery Address',
         dataIndex: 'address',
         key: 'address',
      },
      {
         title: 'Actions',
         dataIndex: 'action',
         key: 'action',
         render: (_value, record) => (
            <div className="users__buttons">
               <button onClick={() => onEditButtonChange(record.id)}>EDIT</button>
               <button onClick={() => onDeleteButtonChange(record.id)}>DELETE</button>
            </div>
         )
      },
   ];

   return (
      <>
         <ViewComponent tableListName="Cemetery List" buttonName="Add new cemetery" columns={columns} dataSource={data} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal isModalOpen={isAddModalOpen} title="Add new cemetery place" setIsModalOpen={setIsAddModalOpen}>
            <AddCemeteryForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch}/>
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};