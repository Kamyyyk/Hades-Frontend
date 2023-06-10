import {PlusCircleOutlined} from '@ant-design/icons';
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
               <Button type="text" size="large" className="table__button--add" onClick={onButtonChange} icon={<PlusCircleOutlined />}>{buttonName}</Button>
            </div>
         )}
         <Table size="middle" columns={columns} dataSource={dataSource} loading={isLoading} />
      </div>
   );
};