import {useState} from 'react';
import {TableViewComponent} from '@src/app/libs/components/table-view-component/table-view-component';
import {IMorgueResponse} from '@src/app/libs/types/reponses/morgue-reponse';
import {ColumnsType} from 'antd/es/table';

const data: IMorgueResponse[] = [
   {
      id: 1,
      name: '',
      surname: '',
      dateArrived: '',
      sex: '',
      birthDate: '',
      deathDate: ''
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

   const columns: ColumnsType<IMorgueResponse> = [
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
         <TableViewComponent<IMorgueResponse>
            tableListName="Morguie list"
            buttonName="Add new deceased"
            columns={columns}
            dataSource={data}
            onButtonChange={onAddButtonChange}
            isLoading/>
         {isModalOpen && <div></div>}
      </>
   );
};