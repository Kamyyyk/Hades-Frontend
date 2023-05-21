import {useEffect, useState} from 'react';
import {AddFuneralItemsForm} from '@src/app/funera-house-worker/funeral-items-view/modal/add-funeral-items-form';
import {deleteFuneralItem, fetchFuneralItems} from '@src/app/libs/api-calls/funeral-items-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {IFuneralItemsResponse} from '@src/app/libs/types/reponses/funeral-items-response';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';


export const FuneralItemsView: React.FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   const navigate = useNavigate();
   
   const {data, isLoading, isError, refetch} = useQuery({
      queryKey: ['fetchFuneralItems'],
      queryFn: fetchFuneralItems
   });

   const {mutate, isSuccess: isDeleteSuccess} = useMutation({
      mutationKey: ['deleteFuneralItem'],
      mutationFn: (funeralItemId: number) => deleteFuneralItem(funeralItemId)
   });

   const onAddButtonChange = () => {
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      console.log('container component edit', id);
   };

   if (isError) {
      navigate('/error');
   }

   useEffect(() => {
      refetch();
   }, [isDeleteSuccess]);

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
               <button onClick={() => onEditButtonChange(record.id)}>EDIT</button>
               <button onClick={() => handleDelete(record.id)}>DELETE</button>
            </div>
         )
      },
   ];
   return (
      <>
         <ViewComponent<IFuneralItemsResponse>
            tableListName="Funeral items list"
            buttonName="Add new funeral item"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
            isLoading={isLoading}
         />
         <AddOrEditModal isModalOpen={isAddModalOpen} title="Add funeral item" setIsModalOpen={setIsAddModalOpen}>
            <AddFuneralItemsForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch}/>
         </AddOrEditModal>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};