import {FC, useEffect, useState} from 'react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ICaravan} from '@src/app/funera-house-worker/caravans-view/caravans-view';
import {AddShippingForm} from '@src/app/funera-house-worker/shipping-view/modal/form/add-shipping-form';
import {EditShippingForm} from '@src/app/funera-house-worker/shipping-view/modal/form/edit-shipping-form';
import {fetchCaravan} from '@src/app/libs/api-calls/caravan-api';
import {deleteShipping, fetchShipping} from '@src/app/libs/api-calls/shipping-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {dictionary} from '@src/app/libs/locales/en';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

interface IShipping {
   id: number;
   caravan: ICaravan | null;
}

export const ShippingView: FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();

   const {data: caravanData} = useQuery({
      queryKey: ['fetchCaravan'],
      queryFn: fetchCaravan
   });

   const {data: shippingData, refetch, isLoading, isError: isFetchShippingError, error: fetchShippingError} = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchShipping'],
      queryFn: fetchShipping
   });
   
   useEffect(() => {
      if (isFetchShippingError && fetchShippingError instanceof Error) {
         toast.error(fetchShippingError.message);
      }
   }, [isFetchShippingError, fetchShippingError]);
   
   
   const {mutate, isSuccess: isDeleteShippingSuccess, isError: isDeleteShippingError, error: deleteShippingError} = useMutation({
      mutationKey: '[deleteShipping]',
      mutationFn: (shippingId: number) => deleteShipping(shippingId)
   });

   useEffect(() => {
      if (isDeleteShippingError && deleteShippingError instanceof Error) {
         toast.error(deleteShippingError.message);
      }
   }, [isDeleteShippingError, deleteShippingError]);

   useEffect(() => {
      if (isDeleteShippingSuccess) {
         toast.success(dictionary.funeralHouseWorker.shippingTable.deleteSuccess);
         refetch();
         setIsConfirmModalOpen(false);
      }
   }, [isDeleteShippingSuccess]);

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

   const handleConfirmDelete =  async () => {
      if (selectedRowKey) {
         await mutate(selectedRowKey);
      }
   };

   const caravanOptions = caravanData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });

   const columns: ColumnsType<IShipping> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: dictionary.form.name,
         dataIndex: 'name',
         key: 'name',
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
         <>
            <TableViewComponent<IShipping> tableListName={dictionary.funeralHouseWorker.shippingTable.shippingList} buttonName={dictionary.funeralHouseWorker.shippingTable.addNewShipping} columns={columns} dataSource={shippingData} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
            <AddOrEditModal setIsModalOpen={setIsAddModalOpen} isModalOpen={isAddModalOpen} title={dictionary.funeralHouseWorker.shippingTable.addNewShipping} >
               <AddShippingForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch} caravanOptions={caravanOptions}/>
            </AddOrEditModal>
            <AddOrEditModal setIsModalOpen={setIsEditModalOpen} isModalOpen={isEditModalOpen} title={dictionary.funeralHouseWorker.shippingTable.editShipping} >
               <EditShippingForm setIsEditModalOpen={setIsEditModalOpen} refetch={refetch} shippingId={selectedRowKey} caravanOptions={caravanOptions}/>
            </AddOrEditModal>
            <ConfirmModal isModalOpen={isConfirmModalOpen} setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete}/>
         </>
      </>
   );
};