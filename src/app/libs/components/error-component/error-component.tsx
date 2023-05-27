import {FC} from 'react';
import '@src/app/libs/components/error-component/error-component.scss';


export const ErrorComponent: FC = () => {
   return (
      <div className="error-component-container">
         <h2>Error on page</h2>
      </div>
   );
};