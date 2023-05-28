import {FC} from 'react';
import '@src/app/login/login.scss';
import {dictionary} from '@src/app/libs/locales/en';
import {LoginForm} from '@src/app/login/form/login-form';

export const Login: FC = () => {

   return (
      <div>
         <div className="login">
            <h1 className="login-header">{dictionary.common.funeralHouseTitle}</h1>
            <div className="login__wrapper">
               <h2 className="login__label">{dictionary.common.login}</h2>
               <div>
                  <LoginForm />
               </div>
            </div>
         </div>
      </div>

   );
};