import type {Dispatch, FC} from 'react';
import {useEffect, useState} from 'react';
import {editDriverById, fetchDriverById, TDriverPayload} from '@src/app/libs/api-calls/driver-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

export interface IEditDriversForm {
    refetch: () => void;
    setIsEditModalOpen: Dispatch<boolean>;
    driverId: number | undefined
}

export const EditDriverForm: FC<IEditDriversForm> = ({refetch, driverId, setIsEditModalOpen}) => {
   const [formValues, setFormValues ] = useState<TDriverPayload>();

   const {data, refetch: refetchDriverById,  isSuccess: isFetchDriverByIdSuccess, isError: isFetchDriverByIdError, error: fetchDriverByIdError, } = useQuery({
      queryKey: ['fetchDriverById'],
      queryFn: () => fetchDriverById(driverId)
   });

   useEffect(() => {
      if (isFetchDriverByIdError && fetchDriverByIdError instanceof Error) {
         toast.error(fetchDriverByIdError.message);
      }
   }, [isFetchDriverByIdError, fetchDriverByIdError]);
   
   useEffect(() => {
      if (isFetchDriverByIdSuccess) {
         setFormValues(data);
      }
   }, [isFetchDriverByIdSuccess]);

   useEffect(() => {
      refetchDriverById().then(r => setFormValues(r.data));
   }, [driverId]);

   const {mutate, isSuccess: isEditDriverByIdSuccess, isError: isEditDriverByIdError, error: editDriverByIdError} = useMutation({
      mutationKey: ['editDriver'],
      mutationFn: (payload: TDriverPayload) => editDriverById(payload, driverId)
   });

   useEffect(() => {
      if (isEditDriverByIdError && editDriverByIdError instanceof Error) {
         toast.error(editDriverByIdError.message);
      }
   }, [isEditDriverByIdError, editDriverByIdError]);

   useEffect(() => {
      if (isEditDriverByIdSuccess) {
         toast.success(dictionary.administrator.driverTable.editSuccess);
         refetch();
         setIsEditModalOpen(false);
      }
   }, [isEditDriverByIdSuccess]);
   
   const onSubmit = (value: TDriverPayload, actions: FormikHelpers<TDriverPayload>) => {
      mutate(value);
      actions.resetForm();
      setIsEditModalOpen(false);
   };
   return (
      <>
         {formValues && (
            <FormWrapper<TDriverPayload> initialValues={formValues} onSubmit={onSubmit}>
               <>
                  <InputField name="name" placeholder={dictionary.form.name}/>
                  <InputField name="surname" placeholder={dictionary.form.surname}/>
               </>
            </FormWrapper>
         )}
      </>
   );
};