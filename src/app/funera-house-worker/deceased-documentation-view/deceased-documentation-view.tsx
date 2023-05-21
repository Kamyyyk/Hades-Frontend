import {useEffect, useState} from 'react';
import {AddCemeteryForm} from '@src/app/funera-house-worker/cemetary-view/modal/form/add-cemetery-form';
import {
   deleteDeceasedDocumentation,
   fetchDeceasedDocumentation
} from '@src/app/libs/api-calls/deceased-documentation-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {
   AddDeceasedDocumentationForm
} from '@src/app/funera-house-worker/deceased-documentation-view/modal/form/add-deceased-documentation-form';


export interface IDocumentation {
   id: number
   name: string;
   morgue: IMorgueResponse | null
}


export const DeceasedDocumentationView: React.FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   const navigate = useNavigate();
   
   const {data, isLoading, refetch, isError} = useQuery({
      queryKey: ['fetchDeceasedDocumentation'],
      queryFn: fetchDeceasedDocumentation
   });

   const {mutate, isSuccess: isDeleteSuccess} = useMutation({
      mutationKey: ['deleteDeceasedDocumentation'],
      mutationFn: (deceasedDocumentationId: number) => deleteDeceasedDocumentation(deceasedDocumentationId)
   });

   useEffect(() => {
      refetch();
   }, [isDeleteSuccess]);

   if (isError) {
      navigate('/error');
   }
   

   const onAddButtonChange = () => {
      console.log('documentation component add');
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      console.log('documentation component edit', id);
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
               <button onClick={() => onEditButtonChange(record.id)}>EDIT</button>
               <button onClick={() => handleDelete(record.id)}>DELETE</button>
            </div>
         )
      },
   ];

   return (
      <>
         <ViewComponent<IDocumentation> tableListName="Deceased documentation list" buttonName="Add new deceased documentation" columns={columns} dataSource={data} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal isModalOpen={isAddModalOpen} title="Add new cemetery place" setIsModalOpen={setIsAddModalOpen}>
            <AddDeceasedDocumentationForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch} />
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};