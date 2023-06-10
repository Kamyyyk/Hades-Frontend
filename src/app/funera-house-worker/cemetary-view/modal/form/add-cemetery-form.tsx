import {Dispatch, FC, useEffect} from 'react';
import {cemeterySchema} from '@src/app/funera-house-worker/cemetary-view/modal/form/schema/cemetery-schema';
import {ICemeteryPayload, postCemetery} from '@src/app/libs/api-calls/cemetery-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {NumberField} from '@src/app/libs/components/form/number-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: ICemeteryPayload = {
   cemeteryName: '',
   address: '',
   price: 0
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
         toast.success(dictionary.funeralHouseWorker.cemeteryPlaceTable.addSuccess);
         refetch();
         setIsAddModalOpen(false);
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
      <FormWrapper initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen}  validationSchema={cemeterySchema}>
         <>
            <InputField name="cemeteryName" placeholder={dictionary.form.cemeteryName}/>
            <InputField name="address" placeholder={dictionary.form.address}/>
            <NumberField name="price"/>
         </>
      </FormWrapper>
   );
};