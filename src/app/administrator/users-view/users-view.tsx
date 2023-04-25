import '@src/app/administrator/users-view/users.scss';
import {TableComponent} from '@src/app/libs/components/table/table-component';
import {ColumnsType} from 'antd/es/table';


interface DataType {
   id: number;
   username: string
}

const data: DataType[] = [
   {
      id:1,
      username: 'adam'
   }
];
export const UsersView: React.FC = () => {
   
   const onButtonChange = () => {
      console.log('dupa');
   };

   const onEditButtonChange = (id: number) => {
      console.log(id);
   };

   const columns: ColumnsType<DataType> = [
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
            <div>
               <button onClick={() => onEditButtonChange(record.id)}>EDIT</button>
            </div>
         )
      },
      
   ];
   return (
      <div className="users">
         <div className="users__wrapper">
            <h2 className="users__wrapper__text">User list</h2>
         </div>
         <TableComponent buttonName="Add new user" columns={columns} dataSource={data} onButtonChange={onButtonChange} />
      </div>
   );
};