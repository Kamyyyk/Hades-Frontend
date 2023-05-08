import {useState} from 'react';
import {IDriver} from '@src/app/administrator/drivers-view/drivers-view';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {ColumnsType} from 'antd/es/table';

export interface ICaravan {
   id: number;
   licenceNumber: string;
   brand: string;
   model: string;
   driver: IDriver | null
}

const data: ICaravan[] = [
   {
      id: 1,
      licenceNumber: '2137',
      brand: 'Kowal',
      model: '',
      driver: null
   }
];

export const CaravansView = () => {
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

   const columns: ColumnsType<ICaravan> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'licenceNumber',
         dataIndex: 'licenceNumber',
         key: 'licenceNumber',
      },
      {
         title: 'brand',
         dataIndex: 'brand',
         key: 'surnbrandame',
      },
      {
         title: 'model',
         dataIndex: 'model',
         key: 'model',
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
         <ViewComponent<ICaravan> tableListName="Caravan List" buttonName="Add new caravan" columns={columns} dataSource={data} onButtonChange={onAddButtonChange}/>
         {isModalOpen && <div></div>}
      </>
   );
};