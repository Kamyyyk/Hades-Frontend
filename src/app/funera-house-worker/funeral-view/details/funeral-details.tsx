import {FC} from 'react';
import {fetchFuneralById} from '@src/app/libs/api-calls/funeral-api';
import {ErrorComponent} from '@src/app/libs/components/error-component/error-component';
import {dictionary} from '@src/app/libs/locales/en';
import {numberToDecimal} from '@src/utils/heleprs/number-to-decimal';
import {orderNumberGenerator} from '@src/utils/heleprs/order-number-generator';
import {FuneralReportGenerator} from '@src/utils/heleprs/funeral-report-generator';
import {Button} from 'antd';
import jsPDF from 'jspdf';
import {useQuery} from 'react-query';
import {useParams} from 'react-router';
import {ClipLoader} from 'react-spinners';
import '@src//app/funera-house-worker/funeral-view/details/funeral-details.scss';

export const FuneralDetails: FC = () => {
   const {funeralId} = useParams();

   const {data, isSuccess, isLoading, isError} = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchMutationById'],
      queryFn: () => fetchFuneralById(funeralId)
   });


   const onDownloadReportClick = () => {
      if (data) {
         FuneralReportGenerator(data);
      }
   };

   return (
      <>
         {isLoading && <ClipLoader />}
         {isSuccess && data && (
            <div className="funeral-details-container">
               <div><h2>{dictionary.common.funeralDetails}</h2></div>
               <div className="funeral-details-container__wrapper">
                  <div className="funeral-details-container__wrapper__info">
                     <p>Name and Surname: <span>{data.morgue.name} {data.morgue.surname}</span></p>
                     <p>{dictionary.common.funeralDate} <span>{data.funeralDate}</span></p>
                     <p>{dictionary.common.deathDate} <span>{data.morgue.deathDate}</span></p>
                     <p>{dictionary.common.containerType} <span>{data.container.containerName}</span></p>
                     <p>Cemetery: <span>{data.placeOnCemetery.cemeteryName}, {data.placeOnCemetery.address}</span></p>
                     <p>{dictionary.common.funeralPrice} <span>{numberToDecimal(data.price)} ZŁ </span></p>
                     {data.reportOrdered && (
                        <Button onClick={onDownloadReportClick}>Download report for the funeral</Button>
                     )}
                  </div>
               </div>
            </div>
         )}
         {isError && (
            <ErrorComponent/>
         )}
      </>
   );
};