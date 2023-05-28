import type {Dispatch, FC} from 'react';
import {useEffect} from 'react';
import {registerUser} from '@src/app/libs/api-calls/register-user';
import {TUserPayload} from '@src/app/libs/api-calls/user-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {PasswordField} from '@src/app/libs/components/form/password-field/password-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

export interface IAddUserForm {
   setIsAddModalOpen: Dispatch<boolean>
   refetch: () => void
   roleTypeOptions: TSelectField[]
}

const initialValues: TUserPayload = {
   username: '',
   password: '',
   role: 'ADMINISTRATOR'
};

export const AddUserForm: FC<IAddUserForm> = ({setIsAddModalOpen, refetch, roleTypeOptions}) => {
   
   const {mutate, isSuccess, isError, error} = useMutation({
      mutationKey: ['addUser'],
      mutationFn: (payload: TUserPayload) => registerUser(payload)
   });

   useEffect(() => {
      if (isError && error instanceof Error) {
         toast.error(error.message);
      }
   }, [isError, error]);

   useEffect(() => {
      if (isSuccess) {
         toast.success(dictionary.administrator.userTable.addSuccess);
         refetch();
         setIsAddModalOpen(false);
      }
   }, [isSuccess]);

   const onSubmit = (value: TUserPayload, actions: FormikHelpers<TUserPayload>) => {
      mutate(value);
      actions.resetForm();
   };

   return (
      <FormWrapper<TUserPayload> initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen} >
         <>
            <InputField name="username" placeholder={dictionary.form.username}/>
            <PasswordField />
            <SelectField name="role" placeholder={dictionary.form.roleType} options={roleTypeOptions} />
         </>
      </FormWrapper>
   );
};