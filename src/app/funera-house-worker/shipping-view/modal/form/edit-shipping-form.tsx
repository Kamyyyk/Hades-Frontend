import type { FC } from 'react';
import {Dispatch, useEffect, useState} from 'react';
import {editShippingById, fetchShippingById, IShippingPayload} from '@src/app/libs/api-calls/shipping-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

export interface IEditShippingForm {
    setIsEditModalOpen: Dispatch<boolean>;
    shippingId: number | undefined;
    refetch: () => void;
    caravanOptions?: TSelectField[];
}

export const EditShippingForm: FC<IEditShippingForm> = ({setIsEditModalOpen, shippingId, refetch, caravanOptions}) => {
   const [formValues, setFormValues] = useState<IShippingPayload>();

   const {mutate, isSuccess: isEditShippingSuccess, isError: isEditShippingError, error: editShippingError} = useMutation({
      mutationKey: ['editShippingById'],
      mutationFn: (payload: IShippingPayload) => editShippingById(shippingId, payload)
   });

   useEffect(() => {
      if (isEditShippingError && editShippingError instanceof Error) {
         toast.error(editShippingError.message);
      }
   }, [isEditShippingError, editShippingError]);
   
   useEffect(() => {
      if (isEditShippingSuccess) {
         toast.success('Successfully edited shipping row');
         refetch();
         setIsEditModalOpen(false);
      }
   }, [isEditShippingSuccess]);


   const {data, isSuccess: isFetchShippingByIdSuccess, isError: isFetchShippingByIdError, error: fetchShippingByIdError, refetch: refetchShippingById} = useQuery({
      queryKey: ['fetchShippingById'],
      queryFn: () => fetchShippingById(shippingId)
   });
   
   useEffect(() => {
      if (isFetchShippingByIdError && fetchShippingByIdError instanceof Error) {
         toast.error(fetchShippingByIdError.message);
      }
   }, [isFetchShippingByIdError, fetchShippingByIdError ]);
   

   const onSubmit = (values: IShippingPayload, actions: FormikHelpers<IShippingPayload>) => {
      mutate(values);
      actions.resetForm();
   };

   useEffect(() => {
      setFormValues(data);
   }, [isFetchShippingByIdSuccess]);


   useEffect(() => {
      refetchShippingById();
   }, [shippingId]);
   
   return (
      <>
         {formValues && (
            <FormWrapper<IShippingPayload> initialValues={formValues} onSubmit={onSubmit} >
               <>
                  <InputField name="name" placeholder="Shipping Name" />
                  {caravanOptions && (
                     <SelectField name="caravan" options={caravanOptions} placeholder="Select driver" />
                  )}
               </>

            </FormWrapper>
         )}
      </>
   );
};