import {Button, Table} from 'antd';
import '@src/app/libs/components/table/table-component.scss';

interface ITableComponent<DataType> {
   buttonName: string;
   columns: DataType[];
   dataSource: DataType[] | undefined;
   onButtonChange: () => void;
   isAddButton: boolean;
   isLoading: boolean;
}

export const TableComponent = <DataType extends object,>({buttonName, onButtonChange, columns, dataSource, isAddButton, isLoading}: ITableComponent<DataType>) => {
   return (
      <div className="table">
         {isAddButton && (
            <div className="table__button">
               <Button onClick={onButtonChange}>{buttonName}</Button>
            </div>
         )}
         <Table columns={columns} dataSource={dataSource} loading={isLoading} />
      </div>
   );
};