import type { FC } from 'react';
import {useEffect} from 'react';
import {login, TLoginPayload} from '@src/app/libs/api-calls/login-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {PasswordField} from '@src/app/libs/components/form/password-field/password-field';
import {dictionary} from '@src/app/libs/locales/en';
import {useAuthContext} from '@src/app/libs/routes/auth-provider';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';


const initialValues: TLoginPayload = {
   username: '',
   password: '',
};

export const LoginForm: FC = () => {
   const navigate = useNavigate();

   const {setCurrentRole, setIsLogged} = useAuthContext();

   const {data, mutate, isSuccess, isError, error} = useMutation({
      mutationKey: ['login'],
      mutationFn: (payload: TLoginPayload) => login(payload)
   });

   useEffect(() => {
      if (isError && error) {
         toast.error(dictionary.auth.error);
      }
   }, [isError, error ]);
   
   useEffect(() => {
      if (isSuccess) {
         setCurrentRole(data?.role);
         localStorage.setItem('IS_LOGGED', 'true');
         localStorage.setItem('CURRENT_ROLE', data?.role);
         setIsLogged(true);
         toast.success(dictionary.auth.success);
         navigate('/');
      }
   }, [isSuccess]);
   
   const onSubmit = (value: TLoginPayload) => {
      mutate(value);
   };
   
   return (
      <FormWrapper<TLoginPayload> initialValues={initialValues} onSubmit={onSubmit}>
         <>
            <InputField name="username" placeholder={dictionary.form.username} />
            <PasswordField isGeneratePasswordVisible={false} />
         </>
      </FormWrapper>
   );
};