import {useEffect, useState} from 'react';
import {
   AddDeceasedDocumentationForm
} from '@src/app/funera-house-worker/deceased-documentation-view/modal/form/add-deceased-documentation-form';
import {
   EditDeceasedDocumentationForm
} from '@src/app/funera-house-worker/deceased-documentation-view/modal/form/edit-deceased-documentation-form';
import {
   deleteDeceasedDocumentation,
   fetchDeceasedDocumentation
} from '@src/app/libs/api-calls/deceased-documentation-api';
import {fetchMorgue} from '@src/app/libs/api-calls/morgue';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';


export interface IDocumentation {
   id: number
   name: string;
   morgue: IMorgueResponse | null
}

export const DeceasedDocumentationView: React.FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   
   const {data, isLoading, refetch, isError: isFetchDeceasedDocumentationError, error: fetchDeceasedDocumentationError } = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchDeceasedDocumentation'],
      queryFn: fetchDeceasedDocumentation
   });

   useEffect(() => {
      if (isFetchDeceasedDocumentationError && fetchDeceasedDocumentationError  instanceof Error) {
         toast.error(fetchDeceasedDocumentationError.message );
      }
   }, [isFetchDeceasedDocumentationError, fetchDeceasedDocumentationError ]);
   

   const {mutate, isSuccess: isDeleteSuccess} = useMutation({
      mutationKey: ['deleteDeceasedDocumentation'],
      mutationFn: (deceasedDocumentationId: number) => deleteDeceasedDocumentation(deceasedDocumentationId)
   });

   useEffect(() => {
      if (isDeleteSuccess) {
         toast.success('Successfully deleted deceased documentation row');
         refetch();
         setIsConfirmModalOpen(false);
      }
   }, [isDeleteSuccess]);

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

   const {data: morgueData} = useQuery({
      queryKey: ['fetchMorgue'],
      queryFn: fetchMorgue
   });
   const morgueOptions = morgueData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });

   const columns: ColumnsType<IDocumentation> = [
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
         <TableViewComponent<IDocumentation> tableListName="Deceased documentation list" buttonName="Add new deceased documentation" columns={columns} dataSource={data} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal isModalOpen={isAddModalOpen} title="Add new deceased documentation" setIsModalOpen={setIsAddModalOpen}>
            <AddDeceasedDocumentationForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch} morgueOptions={morgueOptions} />
         </AddOrEditModal>
         <AddOrEditModal isModalOpen={isEditModalOpen} title="Edit deceased documentation" setIsModalOpen={setIsEditModalOpen}>
            <EditDeceasedDocumentationForm setIsEditModalOpen={setIsEditModalOpen} refetch={refetch} deceasedDocumentationId={selectedRowKey} morgueOptions={morgueOptions} />
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};