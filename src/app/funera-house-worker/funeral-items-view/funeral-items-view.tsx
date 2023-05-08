import {useState} from 'react';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {ColumnsType} from 'antd/es/table';

export interface IContainerView {
   id: number;
   containerName: string;
   containerType: 'COFFIN' | 'URN'
}

const data: IContainerView[] = [{
   id: 1,
   containerName: 'dupa',
   containerType: 'COFFIN'
}];

export const FuneralItemsView: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const onAddButtonChange = () => {
      console.log('container component add');
      setIsModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      console.log('container component edit', id);
   };

   const onDeleteButtonChange = (id: number) => {
      console.log('container component delete', id);
   };

   const columns: ColumnsType<IContainerView> = [
      {
         title: 'id',
         dataIndex: 'id',
         key: 'id',
      },
      {
         title: 'container name',
         dataIndex: 'containerName',
         key: 'containerName',
      },
      {
         title: 'container type',
         dataIndex: 'containerType',
         key: 'containerType',
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
         <ViewComponent<IContainerView>
            tableListName="funeral items list"
            buttonName="Add new container"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
         />
         {isModalOpen && <div></div>}
      </>
   );
};