import {useState} from 'react';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {ColumnsType} from 'antd/es/table';

export interface IPlaceOnCemetery {
   id: number;
   cemeteryName: string;
   address: string;
}

const data: IPlaceOnCemetery[] = [
   {
      id: 1,
      cemeteryName: '2137',
      address: 'Kowal'
   }
];

export const CemeteryView: React.FC = () => {
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

   const columns: ColumnsType<IPlaceOnCemetery> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'cemeteryName',
         dataIndex: 'cemeteryName',
         key: 'cemeteryName',
      },
      {
         title: 'address',
         dataIndex: 'address',
         key: 'address',
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
         <ViewComponent tableListName="Cemetery List" buttonName="Add new cemetery" columns={columns} dataSource={data} onButtonChange={onAddButtonChange}/>
         {isModalOpen && <div></div>}
      </>
   );
};