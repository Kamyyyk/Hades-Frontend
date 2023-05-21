import {useState} from 'react';
import {ICaravan} from '@src/app/funera-house-worker/caravans-view/caravans-view';
import {AddShippingForm} from '@src/app/funera-house-worker/shipping-view/modal/add-shipping-form';
import {deleteShipping, fetchShipping, IShippingPayload, postShipping} from '@src/app/libs/api-calls/shipping-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

interface IShipping {
   id: number;
   caravan: ICaravan | null;
}


export const ShippingView: React.FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   const navigate = useNavigate();

   const {data: shippingData, refetch, isLoading} = useQuery({
      queryKey: ['fetchShipping'],
      queryFn: fetchShipping
   });
   
   const {mutate} = useMutation({
      mutationKey: '[deleteShipping]',
      mutationFn: (shippingId: number) => deleteShipping(shippingId)
   });

   const onAddButtonChange = () => {
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      setSelectedRowKey(id);
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
            toast.success('Successfully deleted Shipping row');
            setIsConfirmModalOpen(false);
         }
      }
   };

   const columns: ColumnsType<IShipping> = [
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
         <>
            <ViewComponent<IShipping> tableListName="Shipping List" buttonName="Add new shipping" columns={columns} dataSource={shippingData} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
            <AddOrEditModal setIsModalOpen={setIsAddModalOpen} isModalOpen={isAddModalOpen} title="Add new shipping" >
               <AddShippingForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch}/>
            </AddOrEditModal>
            <ConfirmModal isModalOpen={isConfirmModalOpen} setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete}/>
         </>
      </>
   );
};