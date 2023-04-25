import {Table} from 'antd';
import '@src/app/libs/components/table/table-component.scss';

interface ITableComponent {
   buttonName: string;
   columns: any[];
   dataSource: any[];
   onButtonChange: () => void;
}

export const TableComponent: React.FC<ITableComponent> = ({buttonName, onButtonChange, columns, dataSource}) => {
   return (
      <div className="table">
         <div className="table__button">
            <button onClick={onButtonChange}>{buttonName}</button>
         </div>
         <Table columns={columns} dataSource={dataSource} />
      </div>
   );
};