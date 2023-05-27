import {useState} from 'react';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {Button} from 'antd';
import {ColumnsType} from 'antd/es/table';

export interface IDriver {
   id: number
   name: string;
   surname: string
}

const data: IDriver[] = [
   {
      id: 1,
      name: 'Adam',
      surname: 'Kowal'
   }
];

export const DriversView: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const onAddButtonChange = () => {
      console.log('driver component add');
      setIsModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      console.log('driver component edit', id);
   };

   const onDeleteButtonChange = (id: number) => {
      console.log('driver component delete', id);
   };

   const columns: ColumnsType<IDriver> = [
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
         title: 'Surname',
         dataIndex: 'surname',
         key: 'surname',
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
         <TableViewComponent<IDriver>
            tableListName="Drivers list"
            buttonName="Add driver"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
            isLoading={false}/>
         {isModalOpen && <div></div>}
      </>
   );
};