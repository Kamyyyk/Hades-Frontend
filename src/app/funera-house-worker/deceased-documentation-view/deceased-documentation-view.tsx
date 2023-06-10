import {FC, useEffect, useState} from 'react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
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
import {dictionary} from '@src/app/libs/locales/en';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';


export interface IDocumentation {
   id: number
   documentationNumber: string;
   morgue: IMorgueResponse | null
}

export const DeceasedDocumentationView: FC = () => {
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
         toast.success(dictionary.funeralHouseWorker.deceasedDocumentationTable.deleteSuccess);
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
         title: dictionary.form.documentationNumber,
         dataIndex: 'documentationNumber',
         key: 'documentationNumber',
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
         <TableViewComponent<IDocumentation> tableListName={dictionary.funeralHouseWorker.deceasedDocumentationTable.deceasedDocumentationList} buttonName={dictionary.funeralHouseWorker.deceasedDocumentationTable.addNewDeceasedDocumentation} columns={columns} dataSource={data} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal isModalOpen={isAddModalOpen} title={dictionary.funeralHouseWorker.deceasedDocumentationTable.addNewDeceasedDocumentation} setIsModalOpen={setIsAddModalOpen}>
            <AddDeceasedDocumentationForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch} morgueOptions={morgueOptions} />
         </AddOrEditModal>
         <AddOrEditModal isModalOpen={isEditModalOpen} title={dictionary.funeralHouseWorker.deceasedDocumentationTable.editDeceasedDocumentation} setIsModalOpen={setIsEditModalOpen}>
            <EditDeceasedDocumentationForm setIsEditModalOpen={setIsEditModalOpen} refetch={refetch} deceasedDocumentationId={selectedRowKey} morgueOptions={morgueOptions} />
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};