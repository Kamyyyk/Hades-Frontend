import {useEffect, useState} from 'react';
import {deleteFuneralById, fetchFunerals} from '@src/app/libs/api-calls/funeral-api';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {IFuneralResponse} from '@src/app/libs/types/reponses/funeral-response';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

export const FuneralView: React.FC = () => {
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   const navigate = useNavigate();

   const {data: funeralData, refetch, isLoading} = useQuery({
      queryKey: 'fetchFunerals',
      queryFn: fetchFunerals
   });
   
   const {mutate, isSuccess: isDeleteSuccess} = useMutation({
      mutationKey: ['deleteFuneral'],
      mutationFn: (funeralId: number) => deleteFuneralById(funeralId)
   });

   const onEditButtonChange = (id: number) => {
      console.log('driver component edit', id);
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
         refetch();
      }
   }, [isDeleteSuccess]);

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
            <div className="users__buttons">
               <button onClick={() => onEditButtonChange(record.id)}>EDIT</button>
               <button onClick={() => handleDelete(record.id)}>DELETE</button>
               <button onClick={() => onViewButtonClick(record.id)}>View</button>
            </div>
         )
      },
   ];
   return (
      <>
         <ViewComponent<IFuneralResponse> tableListName="Funeral List" columns={columns} dataSource={funeralData} isLoading={isLoading} isAddButton={false}/>
         <ConfirmModal setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete} isModalOpen={isConfirmModalOpen} />
      </>
   );
};