import {FC} from 'react';
import {fetchFuneralById} from '@src/app/libs/api-calls/funeral-api';
import {useQuery} from 'react-query';
import {useParams} from 'react-router';

export const FuneralDetails: FC = () => {
   const {funeralId} = useParams();
   
   console.log(funeralId);
   
   // const {data} = useQuery({
   //    queryKey: ['fetchMutationById'],
   //    queryFn: fetchFuneralById(funeralId);
   // });
   
   return (
      <h1>FuneralDetails</h1>
   );
};