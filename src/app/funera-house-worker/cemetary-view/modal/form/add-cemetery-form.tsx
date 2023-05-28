import {Dispatch, FC, useEffect} from 'react';
import {ICemeteryPayload, postCemetery} from '@src/app/libs/api-calls/cemetery-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: ICemeteryPayload = {
   cemeteryName: '',
   address: ''
};

interface IAddCemeteryForm {
   setIsAddModalOpen: Dispatch<boolean>;
   refetch: () => void
}
export const AddCemeteryForm: FC<IAddCemeteryForm> = ({setIsAddModalOpen, refetch}) => {

   const {mutate, isSuccess, isError, error} = useMutation({
      mutationKey: ['postCemetery'],
      mutationFn: (payload: ICemeteryPayload) => postCemetery(payload)
   });

   useEffect(() => {
      if (isSuccess) {
         toast.success('Successfully added new cemetery place');
         refetch();
      }
   }, [isSuccess]);

   useEffect(() => {
      if (isError && error instanceof Error) {
         toast.success(error.message);
      }
   }, [isError, error]);


   const onSubmit = (value: ICemeteryPayload, actions: FormikHelpers<ICemeteryPayload>) => {
      mutate(value);
      actions.resetForm();
   };

   return (
      <FormWrapper initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen} >
         <>
            <InputField name="cemeteryName" placeholder="Cemetery Name"/>
            <InputField name="address" placeholder="Address"/>
         </>
      </FormWrapper>
   );
};