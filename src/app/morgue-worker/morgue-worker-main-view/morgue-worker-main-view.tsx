import type { FC } from 'react';
import {dictionary} from '@src/app/libs/locales/en';
import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';

export const MorgueWorkerMainView: FC = () => {
   const navigate = useNavigate();
   const onClick = () => {
      navigate('/morgue');
   };
   return (
      <div className="main-view__button">
         <Button onClick={onClick}>{dictionary.common.navigateToTable}</Button>
      </div>
   );
};