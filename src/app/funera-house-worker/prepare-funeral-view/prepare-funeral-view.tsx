import {PrepareFuneralForm} from '@src/app/funera-house-worker/prepare-funeral-view/form/prepare-funeral-form';
import '@src//app/funera-house-worker/prepare-funeral-view/prepare-funeral-view.scss';

export const PrepareFuneralView: React.FC = () => {


   return (
      <div className="prepare-funeral-view-container">
         <PrepareFuneralForm />
      </div>
   );
};