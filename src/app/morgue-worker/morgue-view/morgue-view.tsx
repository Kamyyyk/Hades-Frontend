import {useState} from 'react';
import {ViewComponent} from '@src/app/libs/components/view-component/view-component';
import {ColumnsType} from 'antd/es/table';


export interface IMorgue {
   id: number;
   name: string;
   surname: string;
   arriveDate: string;
   sex: string;
   birthDate: string;
   dateOfDeath: string;
}

const data: IMorgue[] = [
   {
      id: 1,
      name: '',
      surname: '',
      arriveDate: '',
      sex: '',
      birthDate: '',
      dateOfDeath: ''
   }
];


export const MorgueView: React.FC = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

   const onAddButtonChange = () => {
      console.log('dupa');
   };

   const onEditButtonChange = (id: number) => {
      console.log(id);
   };

   const onDeleteButtonChange = (id: number) => {
      console.log(id);
   };

   const columns: ColumnsType<IMorgue> = [
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
         title: 'arriveDate',
         dataIndex: 'arriveDate',
         key: 'arriveDate',
      },
      {
         title: 'sex',
         dataIndex: 'sex',
         key: 'sex',
      },
      {
         title: 'birthDate',
         dataIndex: 'birthDate',
         key: 'birthDate',
      },
      {
         title: 'dateOfDeath',
         dataIndex: 'dateOfDeath',
         key: 'dateOfDeath',
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
         <ViewComponent<IMorgue>
            tableListName="Morguie list"
            buttonName="Add new deceased"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
         />
         {isModalOpen && <div></div>}
      </>
   );
};