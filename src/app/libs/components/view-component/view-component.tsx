import {TableComponent} from '@src/app/libs/components/table/table-component';
import '@src/app/libs/components/view-component/view-component.scss';
import {ColumnsType} from 'antd/es/table';

interface IViewComponent<DataType> {
   tableListName: string;
   buttonName: string;
   columns: ColumnsType<DataType>;
   dataSource: DataType[];
   onButtonChange: () => void;
   isAddButton?: boolean;
}

export const ViewComponent = <DataType extends object,>({tableListName, buttonName, onButtonChange, columns, dataSource, isAddButton = true}: IViewComponent<DataType>) => {
   return (
      <div className="view">
         <div className="view__wrapper">
            <h2 className="view__wrapper__text">{tableListName}</h2>
         </div>
         <TableComponent isAddButton={isAddButton} buttonName={buttonName} columns={columns} dataSource={dataSource} onButtonChange={onButtonChange} />
      </div>
   );
};