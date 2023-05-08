import '@src/app/administrator/users-view/users.scss';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {ColumnsType} from 'antd/es/table';

interface IUser {
   id: number;
   username: string
}

const data: IUser[] = [
   {
      id:1,
      username: 'adam'
   }
];
export const UsersView: React.FC = () => {
   
   const onAddButtonChange = () => {
      console.log('dupa');
   };

   const onEditButtonChange = (id: number) => {
      console.log(id);
   };

   const onDeleteButtonChange = (id: number) => {
      console.log(id);
   };

   const columns: ColumnsType<IUser> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'Username',
         dataIndex: 'username',
         key: 'username',
      },
      {
         title: 'Actions',
         dataIndex: 'action',
         key: 'action',
         render: (_value, record) => (
            <div className="users__buttons">
               <button onClick={() => onEditButtonChange(record.id)}>EDIT</button>
               <button onClick={() => onDeleteButtonChange(record.id)}>DELETE</button>
            </div>
         )
      },
      
   ];
   return (
      <>
         <ViewComponent<IUser>
            tableListName="User list"
            buttonName="Add new user"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
         />
      </>
   );
};