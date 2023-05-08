import {Table} from 'antd';
import '@src/app/libs/components/table/table-component.scss';

interface ITableComponent<DataType> {
   buttonName: string;
   columns: DataType[];
   dataSource: DataType[];
   onButtonChange: () => void;
   isAddButton: boolean;
}

export const TableComponent = <DataType extends object,>({buttonName, onButtonChange, columns, dataSource, isAddButton}: ITableComponent<DataType> ) => {
   return (
      <div className="table">
         {isAddButton && (
            <div className="table__button">
               <button onClick={onButtonChange}>{buttonName}</button>
            </div>
         )}
         <Table columns={columns} dataSource={dataSource} />
      </div>
   );
};