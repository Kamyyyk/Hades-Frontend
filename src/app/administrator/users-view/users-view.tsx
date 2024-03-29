import {FC, useEffect, useState} from 'react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {AddUserForm} from '@src/app/administrator/users-view/modal/add-user-form';
import {EditUserForm} from '@src/app/administrator/users-view/modal/edit-user-form';
import {deleteUser, getUsers} from '@src/app/libs/api-calls/user-api';
import {AddOrEditModal} from '@src/app/libs/components/modal/add-or-edit-modal';
import {ConfirmModal} from '@src/app/libs/components/modal/confirm-modal';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {dictionary} from '@src/app/libs/locales/en';
import {TUserResponse} from '@src/app/libs/types/reponses/user-reponse';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';
import '@src/app/libs/components/table/table-component.scss';

const roleTypeOptions = [
   {
      value: 'ADMINISTRATOR',
      label: 'Administrator'
   },
   {
      value: 'FUNERAL_MORGUE_WORKER',
      label: 'Funeral morgue worker'
   },
   {
      value: 'FUNERAL_HOME_EMPLOYEE',
      label: 'funeral home employee'
   },
];

export const UsersView: FC = () => {
   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
   const [selectedRowKey, setSelectedRowKey] = useState<number>();
   
   const {data, refetch, isLoading, isError: isFetchUsersError, error: fetchUsersError} = useQuery({
      queryKey: ['fetchUsers'],
      queryFn: () => getUsers()
   });
   
   useEffect(() => {
      if (isFetchUsersError && fetchUsersError instanceof Error) {
         toast.error(fetchUsersError.message);
      }
   }, [isFetchUsersError, fetchUsersError ]);
   
   const {mutate, isSuccess: isDeleteUserSuccess, isError: isDeleteUserError, error: deleteUserError} = useMutation({
      mutationKey: ['deleteUser'],
      mutationFn: (userId: number) => deleteUser(userId)
   });

   useEffect(() => {
      if (isDeleteUserError && deleteUserError instanceof Error) {
         toast.error(deleteUserError.message);
      }
   }, [isDeleteUserError, deleteUserError ]);
   
   useEffect(() => {
      if (isDeleteUserSuccess) {
         toast.success(dictionary.administrator.userTable.deleteSuccess);
         refetch();
         setIsConfirmModalOpen(false);
      }
   }, [isDeleteUserSuccess]);
   
   const onAddButtonChange = () => {
      setIsAddModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      setSelectedRowKey(id);
      setIsEditModalOpen(true);
   };

   const onDeleteButtonChange = (id: number) => {
      setSelectedRowKey(id);
      setIsConfirmModalOpen(true);
   };
   
   const handleConfirmDelete =  async () => {
      if (selectedRowKey) {
         await mutate(selectedRowKey);
      }
   };

   const columns: ColumnsType<TUserResponse> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: dictionary.form.username,
         dataIndex: 'username',
         key: 'username',
      },
      {
         title: dictionary.common.actions,
         dataIndex: 'action',
         key: 'action',
         render: (_value, record) => (
            <div className="table__action-buttons">
               <Button icon={<EditOutlined />} onClick={() => onEditButtonChange(record.id)}>{dictionary.common.edit.toUpperCase()}</Button>
               <Button icon={<DeleteOutlined />} onClick={() => onDeleteButtonChange(record.id)}>{dictionary.common.delete.toUpperCase()}</Button>
            </div>
         )
      },
      
   ];
   return (
      <>
         <TableViewComponent<TUserResponse> tableListName={dictionary.administrator.userTable.userList} buttonName={dictionary.administrator.userTable.addNewUser} columns={columns} dataSource={data} onButtonChange={onAddButtonChange} isLoading={isLoading}/>
         <AddOrEditModal setIsModalOpen={setIsAddModalOpen} isModalOpen={isAddModalOpen} title={dictionary.administrator.userTable.addNewUser} >
            <AddUserForm setIsAddModalOpen={setIsAddModalOpen} refetch={refetch} roleTypeOptions={roleTypeOptions} />
         </AddOrEditModal>
         <AddOrEditModal setIsModalOpen={setIsEditModalOpen} isModalOpen={isEditModalOpen} title={dictionary.administrator.userTable.editUser}>
            <EditUserForm setIsEditModalOpen={setIsEditModalOpen} refetch={refetch} userId={selectedRowKey} roleTypeOptions={roleTypeOptions}/>
         </AddOrEditModal>
         <ConfirmModal isModalOpen={isConfirmModalOpen} setIsConfirmModalOpen={setIsConfirmModalOpen} onConfirmModalChange={handleConfirmDelete}/>
      </>
   );
};