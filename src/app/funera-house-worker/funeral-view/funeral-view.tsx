import {FC, useEffect, useState} from 'react';
import {EditFuneralForm} from '@src/app/funera-house-worker/funeral-view/form/edit-funeral-form';
import {deleteFuneralById, fetchFunerals} from '@src/app/libs/api-calls/funeral-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {IFuneralResponse} from '@src/app/libs/types/reponses/funeral-response';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

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

   const columns: ColumnsType<IFuneralResponse> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Funeral Date',
         dataIndex: 'funeralDate',
         key: 'funeralDate',
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
      },
      {
         title: 'Actions',
         dataIndex: 'action',
         key: 'action',
         render: (_value, record) => (
            <div className="table__action-buttons">
               <Button onClick={() => onEditButtonChange(record.id)}>EDIT</Button>
               <Button onClick={() => handleDelete(record.id)}>DELETE</Button>
               <Button onClick={() => onViewButtonClick(record.id)}>View</Button>
            </div>
         )
      },
   ];
   return (
      <>
         <TableViewComponent<IFuneralResponse> tableListName="Funeral List" columns={columns} dataSource={funeralData} isLoading={isLoading} isAddButton={false}/>
         <AddOrEditModal isModalOpen={isEditModalOpen} title="Edit funeral" setIsModalOpen={setIsEditModalOpen}>
            <EditFuneralForm funeralId={selectedRowKey}  refetch={refetch} setIsEditModalOpen={setIsEditModalOpen}/>
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};