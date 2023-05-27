import '@src/app/administrator/users-view/users.scss';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {Button} from 'antd';
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
               <Button onClick={() => onEditButtonChange(record.id)}>EDIT</Button>
               <Button onClick={() => onDeleteButtonChange(record.id)}>DELETE</Button>
            </div>
         )
      },
      
   ];
   return (
      <>
         <TableViewComponent<IUser>
            tableListName="User list"
            buttonName="Add new user"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
            isLoading={false}/>
      </>
   );
};