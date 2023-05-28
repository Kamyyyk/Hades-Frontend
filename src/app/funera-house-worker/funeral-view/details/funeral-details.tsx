import {FC} from 'react';
import {fetchFuneralById} from '@src/app/libs/api-calls/funeral-api';
import {ErrorComponent} from '@src/app/libs/components/error-component/error-component';
import {dictionary} from '@src/app/libs/locales/en';
import {useQuery} from 'react-query';
import {useParams} from 'react-router';
import {ClipLoader} from 'react-spinners';
import '@src//app/funera-house-worker/funeral-view/details/funeral-details.scss';

export const FuneralDetails: FC = () => {
   const {funeralId} = useParams();
   
   const {data, isSuccess, isLoading, isError} = useQuery({
      queryKey: ['fetchMutationById'],
      queryFn: () => fetchFuneralById(funeralId)
   });

   
   return (
      <>
         {isLoading && <ClipLoader />}
         {isSuccess && data && (
            <div className="funeral-details-container">
               <div><h2>{dictionary.common.funeralDetails}</h2></div>
               <div className="funeral-details-container__wrapper">
                  <div className="funeral-details-container__wrapper__info">
                     <p>{dictionary.common.name} <span>{data.morgue.name}</span></p>
                     <p>{dictionary.common.surname} <span>{data.morgue.surname}</span></p>
                     <p>{dictionary.common.funeralDate} <span>{data.funeralDate}</span></p>
                     <p>{dictionary.common.deathDate} <span>{data.morgue.deathDate}</span></p>
                     <p>{dictionary.common.containerType} <span>{data.container.containerName}</span></p>
                     <p>{dictionary.common.funeralPrice} <span>{data.price} zł</span></p>
                     <p>{dictionary.common.cemeteryName} <span>{data.placeOnCemetery.cemeteryName}</span></p>
                     <p>{dictionary.common.cemeteryAddress} <span>{data.placeOnCemetery.address}</span></p>
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