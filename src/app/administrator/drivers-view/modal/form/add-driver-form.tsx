import type {Dispatch, FC} from 'react';
import {useEffect} from 'react';
import {postDriver, TDriverPayload} from '@src/app/libs/api-calls/driver-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

export interface IAddDriversForm {
    refetch: () => void;
    setIsAddModalOpen: Dispatch<boolean>
}

const initialValues: TDriverPayload = {
   name: '',
   surname: ''
};

export const AddDriverForm: FC<IAddDriversForm> = ({refetch, setIsAddModalOpen}) => {

   const {mutate, isSuccess, isError, error} = useMutation({
      mutationKey: ['postDriver'],
      mutationFn: (payload: TDriverPayload) => postDriver(payload)
   });

   useEffect(() => {
      if (isError && error instanceof Error) {
         toast.error(error.message);
      }
   }, [isError, error]);
   
   useEffect(() => {
      if (isSuccess) {
         toast.success('Successfully added driver');
         refetch();
         setIsAddModalOpen(false);
      }
   }, [isSuccess]);

   const onSubmit = async (value: TDriverPayload, actions: FormikHelpers<TDriverPayload>) => {
      await mutate(value);
      actions.resetForm();
   };

   return (
      <>
         <FormWrapper<TDriverPayload> initialValues={initialValues} onSubmit={onSubmit}>
            <>
               <InputField name="name" placeholder="Name"/>
               <InputField name="surname" placeholder="Surname"/>
            </>
         </FormWrapper>
      </>
   );
};