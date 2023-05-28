import {FC} from 'react';
import '@src/app/libs/components/error-component/error-component.scss';
import {dictionary} from '@src/app/libs/locales/en';


export const ErrorComponent: FC = () => {
   return (
      <div className="error-component-container">
         <h2>{dictionary.pageError.error}</h2>
      </div>
   );
};