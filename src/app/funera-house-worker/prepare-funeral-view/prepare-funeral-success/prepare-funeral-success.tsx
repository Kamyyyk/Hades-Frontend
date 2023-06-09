import {FC, useEffect} from 'react';
import {
   usePrepareFuneralContextContext
} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {dictionary} from '@src/app/libs/locales/en';
import {IFuneralResponse} from '@src/app/libs/types/reponses/funeral-response';
import {FuneralReportGenerator} from '@src/utils/heleprs/funeral-report-generator';
import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import '@src/app/funera-house-worker/prepare-funeral-view/prepare-funeral-success/prepare-funeral-success.scss';

interface IPrepareFuneralSuccess {
   funeralId: number;
   data: IFuneralResponse;
}

export const PrepareFuneralSuccess: FC<IPrepareFuneralSuccess> = ({funeralId, data}) => {
   const {setPrice} = usePrepareFuneralContextContext();
   
   useEffect(() => {
      setPrice(0);
   }, []);

   const onDownloadReportClick = () => {
      if (data) {
         FuneralReportGenerator(data);
      }
   };

   const navigate = useNavigate();
   return (
      <div className="prepare-funeral-success-container">
         <h2>{dictionary.funeralHouseWorker.prepareFuneral.addSuccess}</h2>
         <div className="prepare-funeral-success-container__button-wrapper">
            <Button onClick={() => navigate(`/funeral/${funeralId}`)}>{dictionary.funeralHouseWorker.prepareFuneral.viewAddedFuneral}</Button>
            {/*<Button onClick={() => navigate('/prepare-funeral')}>{dictionary.funeralHouseWorker.prepareFuneral.prepareAnotherFuneral}</Button>*/}
            <Button onClick={onDownloadReportClick}>Download report for the funeral</Button>
         </div>
      </div>
   );
};