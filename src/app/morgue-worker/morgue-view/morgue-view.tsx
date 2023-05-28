import {FC, useEffect, useState} from 'react';
import {deleteMorgue, fetchMorgue} from '@src/app/libs/api-calls/morgue';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {dictionary} from '@src/app/libs/locales/en';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';
import {AddMorgueForm} from '@src/app/morgue-worker/morgue-view/modal/form/add-morgue-form';
import {EditMorgueForm} from '@src/app/morgue-worker/morgue-view/modal/form/edit-morgue-form';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';


export const MorgueView: FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();

   const {data, isLoading, refetch, isError: isFetchMorgueError , error: fetchMorgueError} = useQuery({
      queryKey: ['fetchMorgue'],
      queryFn: fetchMorgue
   });

   useEffect(() => {
      if (isFetchMorgueError && fetchMorgueError instanceof Error) {
         toast.error(fetchMorgueError.message);
      }
   }, [isFetchMorgueError, fetchMorgueError]);

   const {mutate, isSuccess: isDeleteMorgueSuccess, isError: isDeleteMorgueError, error: deleteMorgueError} = useMutation({
      mutationKey: ['deleteMorgue'],
      mutationFn: (morgueId: number) => deleteMorgue(morgueId)
   });

   
   useEffect(() => {
      if (isDeleteMorgueError && deleteMorgueError instanceof Error) {
         toast.error(deleteMorgueError.message);
      }
   }, [isDeleteMorgueError, deleteMorgueError]);
   
   useEffect(() => {
      if (isDeleteMorgueSuccess) {
         toast.success(dictionary.morgueWorker.deceasedTable.deleteSuccess);
         refetch();
         setIsConfirmModalOpen(false);
      }
   }, [isDeleteMorgueSuccess]);

   const onAddButtonChange = () => {
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      setSelectedRowKey(id);
      setIsEditModalOpen(true);
   };

   const onDeleteButtonChange = (id: number) => {
      setIsConfirmModalOpen(true);
      setSelectedRowKey(id);
   };

   const handleConfirmDelete = () => {
      if (selectedRowKey) {
         mutate(selectedRowKey);
      }
   };

   const columns: ColumnsType<IMorgueResponse> = [
      {
         title: 'Id',
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
         title: 'Arrive date',
         dataIndex: 'dateArrived',
         key: 'dateArrived',
      },
      {
         title: 'Sex',
         dataIndex: 'sex',
         key: 'sex',
      },
      {
         title: 'Birth date',
         dataIndex: 'birthDate',
         key: 'birthDate',
      },
      {
         title: 'Date of death',
         dataIndex: 'deathDate',
         key: 'deathDate',
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
         <TableViewComponent<IMorgueResponse> tableListName={dictionary.morgueWorker.deceasedTable.deceasedList} buttonName={dictionary.morgueWorker.deceasedTable.addNewDeceased} columns={columns} dataSource={data} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal setIsModalOpen={setIsAddModalOpen} isModalOpen={isAddModalOpen} title={dictionary.morgueWorker.deceasedTable.addNewDeceased} >
            <AddMorgueForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch}/>
         </AddOrEditModal>
         <AddOrEditModal setIsModalOpen={setIsEditModalOpen} isModalOpen={isEditModalOpen} title={dictionary.morgueWorker.deceasedTable.editDeceased} >
            <EditMorgueForm setIsEditModalOpen={setIsEditModalOpen} refetch={refetch} morgueId={selectedRowKey}/>
         </AddOrEditModal>
         <ConfirmModal isModalOpen={isConfirmModalOpen} setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete}/>
      </>
   );
};