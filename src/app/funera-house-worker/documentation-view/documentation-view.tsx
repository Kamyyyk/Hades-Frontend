import {useState} from 'react';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {IMorgue} from '@src/app/morgue-worker/morgue-view/morgue-view';
import {ColumnsType} from 'antd/es/table';


export interface IDocumentation {
   id: number
   name: string;
   deceased?: IMorgue | null
}

const data: IDocumentation[] = [
   {
      id: 1,
      name: 'Adam',
      deceased: null
   }
];

export const DocumentationView: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const onAddButtonChange = () => {
      console.log('documentation component add');
      setIsModalOpen(true);
   };

   const onEditButtonChange = (id: number) => {
      console.log('documentation component edit', id);
   };

   const onDeleteButtonChange = (id: number) => {
      console.log('documentation component delete', id);
   };

   const columns: ColumnsType<IDocumentation> = [
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
         <ViewComponent<IDocumentation>
            tableListName="Documentation list"
            buttonName="Add documentation"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
         />
         {isModalOpen && <div></div>}
      </>
   );
};