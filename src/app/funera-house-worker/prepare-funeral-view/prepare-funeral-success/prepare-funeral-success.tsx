import {FC} from 'react';
import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import '@src/app/funera-house-worker/prepare-funeral-view/prepare-funeral-success/prepare-funeral-success.scss';


interface IPrepareFuneralSuccess {
   funeralId: number;
}

export const PrepareFuneralSuccess: FC<IPrepareFuneralSuccess> = ({funeralId}) => {
   const navigate = useNavigate();
   return (
      <div className="prepare-funeral-success-container">
         <h2>Successfully prepared funeral</h2>
         <div className="prepare-funeral-success-container__button-wrapper">
            <Button onClick={() => navigate(`/funeral/${funeralId}`)}>View added funeral</Button>
            <Button onClick={() => navigate('prepare-funeral')}>Prepare another funeral</Button>
         </div>
      </div>
   );
};