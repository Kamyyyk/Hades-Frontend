import type {Dispatch, FC} from 'react';
import {createContext, useContext, useState} from 'react';
import {TUserRole} from '@src/app/libs/routes/Routes';

interface IAuthContext {
   currentRole: TUserRole;
   setCurrentRole: Dispatch<TUserRole>;
   isLogged: boolean;
   setIsLogged: Dispatch<boolean>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IAuthProvider {
   children: JSX.Element
}

export const AuthProvider: FC<IAuthProvider> = ({children}) => {
   const [isLogged, setIsLogged] = useState<boolean>(false);
   const [currentRole, setCurrentRole] = useState<TUserRole>('NO_ROLE');
   
   return (
      <AuthContext.Provider value={{currentRole, setCurrentRole, isLogged, setIsLogged} } >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuthContext = (): IAuthContext => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuthContext is used outside the provider');
   }
   return context;
};