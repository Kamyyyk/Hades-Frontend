import {useEffect, useState} from 'react';
import {AddFuneralItemsForm} from '@src/app/funera-house-worker/funeral-items-view/modal/form/add-funeral-items-form';
import {EditFuneralItemsForm} from '@src/app/funera-house-worker/funeral-items-view/modal/form/edit-funeral-items-form';
import {deleteFuneralItem, fetchFuneralItems} from '@src/app/libs/api-calls/funeral-items-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {IFuneralItemsResponse} from '@src/app/libs/types/reponses/funeral-items-response';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

const containerTypeOptions = [
   {
      label: 'Urn',
      value: 'URN'
   },
   {
      label: 'Coffin',
      value: 'COFFIN'
   }
];


export const FuneralItemsView: React.FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   
   const {data, isLoading, isError: isFetchFuneralItemsError, error: fetchFuneralItemsError, refetch} = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchFuneralItems'],
      queryFn: fetchFuneralItems
   });

   const {mutate, isSuccess: isDeleteFuneralItemSuccess, isError: isDeleteFuneralItemError, error: deleteFuneralItemError} = useMutation({
      mutationKey: ['deleteFuneralItem'],
      mutationFn: (funeralItemId: number) => deleteFuneralItem(funeralItemId)
   });
   
   useEffect(() => {
      if (isFetchFuneralItemsError && fetchFuneralItemsError instanceof Error) {
         toast.error(fetchFuneralItemsError.message);
      }
   }, [isFetchFuneralItemsError, fetchFuneralItemsError]);

   useEffect(() => {
      if (isDeleteFuneralItemSuccess) {
         toast.success('Successfully deleted funeral item');
         refetch();
         setIsConfirmModalOpen(false);
      }
   }, [isDeleteFuneralItemSuccess]);
   
   useEffect(() => {
      if (isDeleteFuneralItemError && deleteFuneralItemError instanceof Error) {
         toast.error(deleteFuneralItemError.message);
      }
   }, [isDeleteFuneralItemError, deleteFuneralItemError]);

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
   

   const columns: ColumnsType<IFuneralItemsResponse> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Container name',
         dataIndex: 'containerName',
         key: 'containerName',
      },
      {
         title: 'Container type',
         dataIndex: 'containerType',
         key: 'containerType',
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
         <TableViewComponent<IFuneralItemsResponse>
            tableListName="Funeral items list"
            buttonName="Add new funeral item"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
            isLoading={isLoading}
         />
         <AddOrEditModal isModalOpen={isAddModalOpen} title="Add funeral item" setIsModalOpen={setIsAddModalOpen}>
            <AddFuneralItemsForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch} containerTypeOptions={containerTypeOptions}/>
         </AddOrEditModal>
         <AddOrEditModal isModalOpen={isEditModalOpen} title="Edit funeral item" setIsModalOpen={setIsEditModalOpen}>
            <EditFuneralItemsForm setIsEditModalOpen={setIsEditModalOpen} refetch={refetch} funeralItemId={selectedRowKey} containerTypeOptions={containerTypeOptions} />
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};