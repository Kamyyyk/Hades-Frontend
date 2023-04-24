import { login } from '@src/app/libs/api-calls/login-api';
import { useMutation } from 'react-query';
import '@src/App/login/style/login.scss';

export const Login: React.FC = () => {

   const {mutate} = useMutation({
      mutationKey: ['login'],
      mutationFn: () => login({username: 'admin', password: 'admin'})
   });

   const onClick = () => {
      mutate();
   };

   
   return (
      <div className="login">
         <div className="login__wrapper">
            <p className="login__wrapper__login-text">Login</p>
            <div className="login__wrapper__form">
               <div className="login__wrapper__form__input">
                  <label>Username</label>
                  <input />
               </div>
               <div className="login__wrapper__form__input">
                  <label>Password</label>
                  <input type="password"/>
               </div>
               <button className="login__wrapper__form__button" onClick={() => onClick()} >Submit</button>
            </div>
         </div>
      </div>
   );
};