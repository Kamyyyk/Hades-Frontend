import {FC, useEffect, useState} from 'react';
import {DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import {EditFuneralForm} from '@src/app/funera-house-worker/funeral-view/form/edit-funeral-form';
import {deleteFuneralById, fetchFunerals} from '@src/app/libs/api-calls/funeral-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {dictionary} from '@src/app/libs/locales/en';
import {IFuneralResponse} from '@src/app/libs/types/reponses/funeral-response';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

type TFuneralStatus = 'OPEN' | 'FINISHED' | 'IN_PROGRESS'

export const FuneralView: FC = () => {
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   const navigate = useNavigate();

   const {data: funeralData, refetch, isLoading, isError: isFetchFuneralError, error: fetchFuneralError} = useQuery({
      refetchOnWindowFocus: false,
      queryKey: 'fetchFunerals',
      queryFn: fetchFunerals
   });
   
   useEffect(() => {
      if (isFetchFuneralError && fetchFuneralError instanceof Error) {
         toast.error(fetchFuneralError.message);
      }
   }, [isFetchFuneralError, fetchFuneralError]);
   
   const {mutate, isSuccess: isDeleteSuccess, isError: isDeleteFuneralByIdError , error: deleteFuneralByIdError} = useMutation({
      mutationKey: ['deleteFuneral'],
      mutationFn: (funeralId: number) => deleteFuneralById(funeralId)
   });

   useEffect(() => {
      if (isDeleteFuneralByIdError && deleteFuneralByIdError instanceof Error) {
         toast.error(deleteFuneralByIdError.message);
      }
   }, [isDeleteFuneralByIdError,deleteFuneralByIdError]);

   const onEditButtonChange = (id: number) => {
      setSelectedRowKey(id);
      setIsEditModalOpen(true);
   };

   const handleDelete = (id: number) => {
      setSelectedRowKey(id);
      setIsConfirmModalOpen(true);
   };
   
   const onViewButtonClick = (id: number) => {
      navigate(`/funeral/${id}`);
   };
   
   useEffect(() => {
      if (isDeleteSuccess) {
         toast.success('Successfully deleted funeral');
         refetch();
         setIsConfirmModalOpen(false);
      }
   }, [isDeleteSuccess]);

   const handleConfirmDelete = async () => {
      if (selectedRowKey) {
         await mutate(selectedRowKey);
      }
   };

   const renderStatusType = (status: TFuneralStatus) => {
      switch(status) {
      case 'OPEN':
         return <p>{dictionary.funeralHouseWorker.prepareFuneral.options.funeralStatus.open}</p>;
      case 'IN_PROGRESS':
         return <p>{dictionary.funeralHouseWorker.prepareFuneral.options.funeralStatus.inProgress}</p>;
      case 'FINISHED':
         return <p>{dictionary.funeralHouseWorker.prepareFuneral.options.funeralStatus.finished}</p>;
      }
   };

   const columns: ColumnsType<IFuneralResponse> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: dictionary.form.funeralDate,
         dataIndex: 'funeralDate',
         key: 'funeralDate',
      },
      {
         title: dictionary.form.status,
         dataIndex: 'status',
         key: 'status',
         render: (_value, record) => (
            renderStatusType(record.status)
         )
      },
      {
         title: dictionary.common.actions,
         dataIndex: 'action',
         key: 'action',
         render: (_value, record) => (
            <div className="table__action-buttons">
               <Button icon={<EditOutlined/>} onClick={() => onEditButtonChange(record.id)}>{dictionary.common.edit.toUpperCase()}</Button>
               <Button icon={<DeleteOutlined/>} onClick={() => handleDelete(record.id)}>{dictionary.common.delete.toUpperCase()}</Button>
               <Button icon={<EyeOutlined />} onClick={() => onViewButtonClick(record.id)}>{dictionary.common.view.toUpperCase()}</Button>
            </div>
         )
      },
   ];
   return (
      <>
         <TableViewComponent<IFuneralResponse> tableListName={dictionary.funeralHouseWorker.funeralTable.funeralList} columns={columns} dataSource={funeralData} isLoading={isLoading} isAddButton={false}/>
         <AddOrEditModal isModalOpen={isEditModalOpen} title={dictionary.funeralHouseWorker.funeralItemsTable.editFuneralItem} setIsModalOpen={setIsEditModalOpen}>
            <EditFuneralForm funeralId={selectedRowKey}  refetch={refetch} setIsEditModalOpen={setIsEditModalOpen}/>
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};