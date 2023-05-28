import {FC, useEffect, useState} from 'react';
import {AddCemeteryForm} from '@src/app/funera-house-worker/cemetary-view/modal/form/add-cemetery-form';
import {EditCemeteryForm} from '@src/app/funera-house-worker/cemetary-view/modal/form/edit-cemetery-form';
import {deleteCemetery, fetchCemeteries} from '@src/app/libs/api-calls/cemetery-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {dictionary} from '@src/app/libs/locales/en';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

export interface IPlaceOnCemetery {
   id: number;
   cemeteryName: string;
   address: string;
}

export const CemeteryView: FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();

   const {data , isError: isFetchCemeteryError, error: fetchCemeteryError, isLoading, refetch} = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchCemetery'],
      queryFn: fetchCemeteries
   });

   useEffect(() => {
      if (isFetchCemeteryError && fetchCemeteryError instanceof Error) {
         toast.error(fetchCemeteryError.message);
      }
   }, [isFetchCemeteryError, fetchCemeteryError]);

   const {mutate, isSuccess: isDeleteCemeterySuccess, isError: isDeleteCemeteryError, error: deleteCemeteryError} = useMutation({
      mutationKey: ['deleteCemetery'],
      mutationFn: (cemeteryId: number) => deleteCemetery((cemeteryId))
   });
   
   useEffect(() => {
      if (isDeleteCemeteryError && deleteCemeteryError instanceof Error) {
         toast.error(deleteCemeteryError.message);
      } 
   }, [isDeleteCemeteryError, deleteCemeteryError ]);

   console.log(isDeleteCemeterySuccess);
   
   useEffect(() => {
      if (isDeleteCemeterySuccess) {
         toast.success(dictionary.funeralHouseWorker.cemeteryPlaceTable.deleteSuccess);
         refetch();
         setIsConfirmModalOpen(false);
      }
   }, [isDeleteCemeterySuccess]);
   
   const onAddButtonChange = () => {
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      setSelectedRowKey(id);
      setIsEditModalOpen(true);
   };

   const onDeleteButtonChange = (id: number) => {
      setSelectedRowKey(id);
      setIsConfirmModalOpen(true);
   };

   const handleConfirmDelete = async () => {
      if (selectedRowKey) {
         await mutate(selectedRowKey);
      }
   };

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
            <div className="table__action-buttons">
               <Button onClick={() => onEditButtonChange(record.id)}>EDIT</Button>
               <Button onClick={() => onDeleteButtonChange(record.id)}>DELETE</Button>
            </div>
         )
      },
   ];

   return (
      <>
         <TableViewComponent tableListName={dictionary.funeralHouseWorker.cemeteryPlaceTable.cemeteryPlaceList} buttonName={dictionary.funeralHouseWorker.cemeteryPlaceTable.addNewCemeteryPlace} columns={columns} dataSource={data} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal isModalOpen={isAddModalOpen} title={dictionary.funeralHouseWorker.cemeteryPlaceTable.addNewCemeteryPlace} setIsModalOpen={setIsAddModalOpen}>
            <AddCemeteryForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch}/>
         </AddOrEditModal>
         <AddOrEditModal isModalOpen={isEditModalOpen} title={dictionary.funeralHouseWorker.cemeteryPlaceTable.editCemeteryPlace} setIsModalOpen={setIsEditModalOpen}>
            <EditCemeteryForm setIsEditModalOpen={setIsEditModalOpen} refetch={refetch} cemeteryId={selectedRowKey} />
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};