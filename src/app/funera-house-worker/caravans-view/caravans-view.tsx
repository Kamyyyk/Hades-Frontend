import {useEffect, useState} from 'react';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {IDriver} from '@src/app/administrator/drivers-view/drivers-view';
import {AddCaravanForm} from '@src/app/funera-house-worker/caravans-view/modal/form/add-caravan-form';
import {EditCaravanForm} from '@src/app/funera-house-worker/caravans-view/modal/form/edit-caravan-form';
import {deleteCaravan, fetchCaravan} from '@src/app/libs/api-calls/caravan-api';
import {fetchDrivers} from '@src/app/libs/api-calls/driver-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {dictionary} from '@src/app/libs/locales/en';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
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
   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();

   const {data: caravanData, isError: isFetchCaravanError, isLoading, refetch, error: fetchCaravanError } = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchCaravan'],
      queryFn: fetchCaravan,
   });


   useEffect(() => {
      if (isFetchCaravanError && fetchCaravanError instanceof Error) {
         toast.error(fetchCaravanError.message);
      }
   }, [isFetchCaravanError, fetchCaravanError]);

   const {mutate, isSuccess: isDeleteCaravanSuccess, isError: isDeleteCaravanError, error: deleteCaravanError} = useMutation({
      mutationKey: ['deleteCaravan'],
      mutationFn: (caravanId: number) => deleteCaravan(caravanId)
   });

   useEffect(() => {
      if (isDeleteCaravanError && deleteCaravanError instanceof Error) {
         toast.error(deleteCaravanError.message);
      }
   }, [isDeleteCaravanError, deleteCaravanError ]);

   useEffect(() => {
      if (isDeleteCaravanSuccess) {
         toast.success(dictionary.funeralHouseWorker.caravanTable.deleteSuccess);
         setIsConfirmModalOpen(false);
         refetch();
      }
   }, [isDeleteCaravanSuccess]);

   const {data: driverData} = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchDrivers'],
      queryFn: fetchDrivers
   });

   const driverOptions = driverData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });

   const onAddButtonChange = () => {
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      setSelectedRowKey(id);
      setIsEditModalOpen(true);
   };

   const handleDelete = (id: number) => {
      setSelectedRowKey(id);
      setIsConfirmModalOpen(true);
   };

   const handleConfirmDelete = async () => {
      if (selectedRowKey) {
         await mutate(selectedRowKey);
      }
   };

   const columns: ColumnsType<ICaravan> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: dictionary.form.licenceNumber,
         dataIndex: 'licenceNumber',
         key: 'licenceNumber',
      },
      {
         title: dictionary.form.brand,
         dataIndex: 'brand',
         key: 'brand',
      },
      {
         title: dictionary.form.model,
         dataIndex: 'model',
         key: 'model',
      },
      {
         title: dictionary.common.actions,
         dataIndex: 'action',
         key: 'action',
         render: (_value, record) => (
            <div className="table__action-buttons">
               <Button icon={<EditOutlined />} onClick={() => onEditButtonChange(record.id)}>{dictionary.common.edit.toUpperCase()}</Button>
               <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>{dictionary.common.delete.toUpperCase()}</Button>
            </div>
         )
      },
   ];

   return (
      <>
         <TableViewComponent<ICaravan> tableListName={dictionary.funeralHouseWorker.caravanTable.caravanList} buttonName={dictionary.funeralHouseWorker.caravanTable.addNewCaravan} columns={columns} dataSource={caravanData} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal setIsModalOpen={setIsAddModalOpen} isModalOpen={isAddModalOpen} title={dictionary.funeralHouseWorker.caravanTable.addNewCaravan} >
            <AddCaravanForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch} driverOptions={driverOptions}/>
         </AddOrEditModal>
         <AddOrEditModal setIsModalOpen={setIsEditModalOpen} isModalOpen={isEditModalOpen} title={dictionary.funeralHouseWorker.caravanTable.editCaravan} >
            <EditCaravanForm setIsEditCaravanOpen={setIsEditModalOpen} refetch={refetch} caravanId={selectedRowKey} driverOptions={driverOptions}/>
         </AddOrEditModal>
         <ConfirmModal isModalOpen={isConfirmModalOpen} setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete}/>
      </>
   );
};