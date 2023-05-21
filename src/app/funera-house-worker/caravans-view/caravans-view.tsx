import {useEffect, useState} from 'react';
import {IDriver} from '@src/app/administrator/drivers-view/drivers-view';
import {AddCaravanForm} from '@src/app/funera-house-worker/caravans-view/modal/form/add-caravan-form';
import {deleteCaravan, fetchCaravan} from '@src/app/libs/api-calls/caravan-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

export interface ICaravan {
   id: number;
   licenceNumber: string;
   brand: string;
   model: string;
   driver: IDriver | null
}

export const CaravansView = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   const navigate = useNavigate();


   const {data: caravanData, isError, isLoading, refetch } = useQuery({
      queryKey: ['fetchCaravan'],
      queryFn: fetchCaravan,
   });

   const {mutate, isSuccess: isDeleteCaravanSuccess} = useMutation({
      mutationKey: ['deleteCaravan'],
      mutationFn: (caravanId: number) => deleteCaravan(caravanId)
   });

   useEffect(() => {
      refetch();
   }, [isDeleteCaravanSuccess]);

   const onAddButtonChange = () => {
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      setSelectedRowKey(id);
   };

   const handleDelete = (id: number) => {
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
            toast.success('Successfully deleted caravan row');
            setIsConfirmModalOpen(false);
         }
      }
   };



   const columns: ColumnsType<ICaravan> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Licence Number',
         dataIndex: 'licenceNumber',
         key: 'licenceNumber',
      },
      {
         title: 'Brand',
         dataIndex: 'brand',
         key: 'brand',
      },
      {
         title: 'Modal',
         dataIndex: 'model',
         key: 'model',
      },
      {
         title: 'Actions',
         dataIndex: 'action',
         key: 'action',
         render: (_value, record) => (
            <div className="users__buttons">
               <Button onClick={() => onEditButtonChange(record.id)}>EDIT</Button>
               <Button onClick={() => handleDelete(record.id)}>DELETE</Button>
            </div>
         )
      },
   ];

   return (
      <>
         <ViewComponent<ICaravan> tableListName="Caravan List" buttonName="Add new caravan" columns={columns} dataSource={caravanData} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal setIsModalOpen={setIsAddModalOpen} isModalOpen={isAddModalOpen} title="Add new caravan" >
            <AddCaravanForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch}/>
         </AddOrEditModal>
         <ConfirmModal isModalOpen={isConfirmModalOpen} setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete}/>
      </>
   );
};