import type { FC } from 'react';
import {usePrepareFuneralContextContext} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {numberToDecimal} from '@src/utils/heleprs/number-to-decimal';

export const PriceComponent: FC = () => {

   const {price} = usePrepareFuneralContextContext();

   return (
      <div>
         <p>Total price for funeral:</p>
         <div>
            <p>{numberToDecimal(price)} ZŁ</p>
         </div>
      </div>
   );
};