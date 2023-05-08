import {useState} from 'react';
import {IPlaceOnCemetery} from '@src/app/funera-house-worker/cemetary-view/cemetery-view';
import {IContainerView} from '@src/app/funera-house-worker/funeral-items-view/funeral-items-view';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {IMorgue} from '@src/app/morgue-worker/morgue-view/morgue-view';
import {ColumnsType} from 'antd/es/table';

interface IFuneralView {
    id: number;
    funeralDate: string;
    status: 'OPEN' | 'FINISHED' | 'IN_PROGRESS';
    price: number;
    deceased: IMorgue | null;
    container: IContainerView | null;
    placeOnCemetery: IPlaceOnCemetery | null;
}

const data: IFuneralView[] = [{
   id: 1,
   funeralDate: new Date().toString(),
   status: 'OPEN',
   price: 1000,
   deceased: null,
   container: null,
   placeOnCemetery: null
}];

export const FuneralView: React.FC = () => {
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

   const columns: ColumnsType<IFuneralView> = [
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
         <ViewComponent<IFuneralView>
            tableListName="funeral list"
            buttonName="Add new user"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
            isAddButton={false}
         />
         {isModalOpen && <div></div>}
      </>
   );
};