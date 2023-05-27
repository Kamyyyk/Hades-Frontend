import {FC} from 'react';
import {fetchFuneralById} from '@src/app/libs/api-calls/funeral-api';
import {ErrorComponent} from '@src/app/libs/components/error-component/error-component';
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
               <div><h2>Funeral details</h2></div>
               <div className="funeral-details-container__wrapper">
                  <div className="funeral-details-container__wrapper__info">
                     <p>Name: <span>{data.morgue.name}</span></p>
                     <p>Surname: <span>{data.morgue.surname}</span></p>
                     <p>Funeral date: <span>{data.funeralDate}</span></p>
                     <p>Death date: <span>{data.morgue.deathDate}</span></p>
                     <p>Container type: <span>{data.container.containerName}</span></p>
                     <p>Funeral price: <span>{data.price} zł</span></p>
                     <p>Cemetery Name: <span>{data.placeOnCemetery.cemeteryName}</span></p>
                     <p>Cemetery address: <span>{data.placeOnCemetery.address}</span></p>
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