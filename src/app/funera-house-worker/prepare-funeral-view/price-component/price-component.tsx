import type { FC } from 'react';
import {usePrepareFuneralContextContext} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {dictionary} from '@src/app/libs/locales/en';
import {numberToDecimal} from '@src/utils/heleprs/number-to-decimal';
import '@src/app/funera-house-worker/prepare-funeral-view/price-component/price-component.scss';

export const PriceComponent: FC = () => {

   const {price} = usePrepareFuneralContextContext();

   return (
      <div className="price">
         <p>{dictionary.common.funeralPrice}</p>
         <div className="price--total">
            <p>{numberToDecimal(price)} {dictionary.common.pln}</p>
         </div>
      </div>
   );
};