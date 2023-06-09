import {createContext, Dispatch, FC, useContext, useState} from 'react';

interface IPrepareFuneralContext {
   price: number;
   setPrice: Dispatch<number>;
   distance : number;
   setDistance: Dispatch<number>;
   shippingPrice: number ;
   setShippingPrice: Dispatch<number>;
}

export const PrepareFuneralContext = createContext< IPrepareFuneralContext | undefined>(undefined);

export const usePrepareFuneralContextContext = (): IPrepareFuneralContext  => {
   const context = useContext(PrepareFuneralContext);
   if (!context) {
      throw new Error('usePrepareFuneralContext is used outside the provider');
   }
   return context;
};

interface IPrepareFuneralProvider {
   children: JSX.Element;
}

export const PrepareFuneralProvider: FC<IPrepareFuneralProvider> = ({children}) => {
   const [price, setPrice] = useState<number>(0);
   const [distance, setDistance] = useState<number>(0);
   const [shippingPrice, setShippingPrice] = useState<number>(0);
   return (
      <PrepareFuneralContext.Provider value={{price, setPrice, distance, setDistance, shippingPrice, setShippingPrice}}>
         {children}
      </PrepareFuneralContext.Provider>
   );
};