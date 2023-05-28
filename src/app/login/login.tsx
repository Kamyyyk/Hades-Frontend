import {FC} from 'react';
import '@src/app/login/login.scss';
import {LoginForm} from '@src/app/login/form/login-form';

export const Login: FC = () => {

   return (
      <div>
         <div className="login">
            <h1 className="login-header">Funeral house one way ticket</h1>
            <div className="login__wrapper">
               <h2 className="login__label">Login</h2>
               <div>
                  <LoginForm />
               </div>
            </div>
         </div>
      </div>

   );
};