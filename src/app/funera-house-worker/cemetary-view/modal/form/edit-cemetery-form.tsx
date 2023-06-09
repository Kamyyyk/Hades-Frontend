import {Dispatch, FC, useEffect, useState} from 'react';
import {editCemetery, fetchCemeteryById, ICemeteryPayload} from '@src/app/libs/api-calls/cemetery-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {NumberField} from '@src/app/libs/components/form/number-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

interface IEditCemeteryForm {
   cemeteryId: number | undefined;
   refetch: () => void;
   setIsEditModalOpen: Dispatch<boolean>
}

export const EditCemeteryForm: FC<IEditCemeteryForm> = ({cemeteryId, setIsEditModalOpen, refetch}) => {
   const [formValues, setFormValues] = useState<ICemeteryPayload>();

   const {data, isSuccess, refetch: refetchById} = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchCemeteryById'],
      queryFn: () => fetchCemeteryById(cemeteryId),
   });

   console.log(formValues);

   const {mutate, isSuccess: isMutationSuccess, isError: isEditCemeteryError, error: editCemeteryError} = useMutation({
      mutationKey: ['editCemeteryById'],
      mutationFn: (payload: ICemeteryPayload) => editCemetery(payload, cemeteryId)
   });

   useEffect(() => {
      if (isSuccess) {
         setFormValues(data);
      }
   }, [isSuccess, data]);

   useEffect(() => {
      if (isMutationSuccess) {
         toast.success(dictionary.funeralHouseWorker.cemeteryPlaceTable.editSuccess);
         refetch();
         setIsEditModalOpen(false);
      }
   }, [isMutationSuccess]);

   useEffect(() => {
      if (isEditCemeteryError && editCemeteryError instanceof Error) {
         toast.error(editCemeteryError.message);
      }
   }, [isEditCemeteryError, editCemeteryError]);

   useEffect(() => {
      refetchById();
   }, [cemeteryId]);

   const onSubmit =  async (value: ICemeteryPayload, actions: FormikHelpers<ICemeteryPayload>) => {
      await mutate(value);
      actions.resetForm();
   };

   return (
      <>
         {formValues && (
            <FormWrapper initialValues={formValues} onSubmit={onSubmit}>
               <>
                  <InputField name="cemeteryName" placeholder={dictionary.form.cemeteryName}/>
                  <InputField name="address" placeholder={dictionary.form.address}/>
                  <NumberField name="price"/>
               </>
            </FormWrapper>
         )}
      </>

   );
};