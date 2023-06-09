import type { FC } from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const FuneralHouseWorkerMainView: FC = () => {
   const navigate = useNavigate();

   useEffect(() => {
      return navigate('/funeral');
   }, []);

   return (
      <div>
      </div>
   );
};