import type { FC } from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


export const AdministratorMainView: FC = () => {
   const navigate = useNavigate();

   useEffect(() => {
      return navigate('/users');
   }, []);

   return (
      <div>
      </div>
   );
};