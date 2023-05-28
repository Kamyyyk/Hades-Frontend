import {FC, useEffect, useState} from 'react';
import {AddDriverForm} from '@src/app/administrator/drivers-view/modal/form/add-driver-form';
import {EditDriverForm} from '@src/app/administrator/drivers-view/modal/form/edit-driver-form';
import {deleteDriver, fetchDrivers} from '@src/app/libs/api-calls/driver-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {IDriverResponse} from '@src/app/libs/types/reponses/driver-response';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

export interface IDriver {
   id: number
   name: string;
   surname: string
}

export const DriversView: FC = () => {
   const [isAddModalOpen, setIsAddModalOpen ] = useState<boolean>(false);
   const [isEditModalOpen, setIsEditModalOpen ] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen ] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   
   const {data, isLoading, refetch, isError: isFetchDriversError, error: fetchDriversError} = useQuery({
      queryKey: [fetchDrivers],
      queryFn: fetchDrivers
   });

   useEffect(() => {
      if (isFetchDriversError && fetchDriversError instanceof Error) {
         toast.error(fetchDriversError.message);
      }
   }, [isFetchDriversError, fetchDriversError]);

   const {mutate, isSuccess: isDeleteDriverSuccess, isError: isDeleteDriverError, error: deleteDriverError} = useMutation({
      mutationKey: ['deleteDriver'],
      mutationFn: (driverId: number) => deleteDriver(driverId)
   });


   useEffect(() => {
      if (isDeleteDriverError && deleteDriverError instanceof Error) {
         toast.error(deleteDriverError.message);
      }
   }, [isDeleteDriverError, fetchDriversError]);


   useEffect(() => {
      if (isDeleteDriverSuccess) {
         toast.success('Successfully deleted driver');
         refetch();
         setIsConfirmModalOpen(false);
      }
   }, [isDeleteDriverSuccess]);

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

   const columns: ColumnsType<IDriver> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Surname',
         dataIndex: 'surname',
         key: 'surname',
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
         <TableViewComponent<IDriverResponse> tableListName="Drivers List" buttonName="Add new driver" columns={columns} dataSource={data} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal setIsModalOpen={setIsAddModalOpen} isModalOpen={isAddModalOpen} title="Add new driver" >
            <AddDriverForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch}/>
         </AddOrEditModal>
         <AddOrEditModal setIsModalOpen={setIsEditModalOpen} isModalOpen={isEditModalOpen} title="Edit driver" >
            <EditDriverForm setIsEditModalOpen={setIsEditModalOpen} refetch={refetch} driverId={selectedRowKey} />
         </AddOrEditModal>
         <ConfirmModal isModalOpen={isConfirmModalOpen} setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete}/>
      </>
   );
};