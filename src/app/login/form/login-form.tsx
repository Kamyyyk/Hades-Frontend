import type { FC } from 'react';
import {useEffect} from 'react';
import {login, TLoginPayload} from '@src/app/libs/api-calls/login-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';


const initialValues: TLoginPayload = {
   username: '',
   password: '',
};

export const LoginForm: FC = () => {

   const {data, mutate, isSuccess, isError, error} = useMutation({
      mutationKey: ['login'],
      mutationFn: (payload: TLoginPayload) => login(payload)
   });

   useEffect(() => {
      if (isError && error) {
         toast.error('User not found');
      }
   }, [isError, error ]);
   
   useEffect(() => {
      if (isSuccess) {
         localStorage.setItem('CURRENT_ROLE', data?.role);
         toast.success('Logged successfully');
         location.reload();
      }
   }, [isSuccess]);
   
   const onSubmit = (value: TLoginPayload) => {
      mutate(value);
   };
   
   return (
      <FormWrapper<TLoginPayload> initialValues={initialValues} onSubmit={onSubmit}>
         <>
            <InputField name="username" placeholder="Username" />
            <InputField name="password" placeholder="Password" />
         </>
      </FormWrapper>
   );
};