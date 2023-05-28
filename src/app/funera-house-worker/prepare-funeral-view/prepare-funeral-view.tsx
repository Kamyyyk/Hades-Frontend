import {FC} from 'react';
import {PrepareFuneralForm} from '@src/app/funera-house-worker/prepare-funeral-view/form/prepare-funeral-form';
import '@src//app/funera-house-worker/prepare-funeral-view/prepare-funeral-view.scss';

export const PrepareFuneralView: FC = () => {


   return (
      <div className="prepare-funeral-view-container">
         <PrepareFuneralForm />
      </div>
   );
};