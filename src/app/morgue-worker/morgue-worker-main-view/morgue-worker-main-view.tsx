import type { FC } from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const MorgueWorkerMainView: FC = () => {

   const navigate = useNavigate();

   useEffect(() => {
      return navigate('/morgue');
   }, []);
   
   return (
      <div>
      </div>
   );
};