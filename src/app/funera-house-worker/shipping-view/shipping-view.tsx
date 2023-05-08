import {useState} from 'react';
import {IDriver} from '@src/app/administrator/drivers-view/drivers-view';
import {ICaravan} from '@src/app/funera-house-worker/caravans-view/caravans-view';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {ColumnsType} from 'antd/es/table';

interface IShipping {
   id: number;
   caravan: ICaravan | null;
   driver: IDriver | null
}

const data: IShipping[] = [
   {
      id: 1,
      caravan: null,
      driver: {
         id: 1,
         name: 'Adam',
         surname: 'Kowal'
      }
   }
];


export const ShippingView: React.FC = () => {
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

   const columns: ColumnsType<IShipping> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'name',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'surname',
         dataIndex: 'surname',
         key: 'surname',
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
         <ViewComponent<IShipping> tableListName="Shipping List" buttonName="Add new shipping" columns={columns} dataSource={data} onButtonChange={onAddButtonChange}/>
         {isModalOpen && <div></div>}
      </>
   );
};