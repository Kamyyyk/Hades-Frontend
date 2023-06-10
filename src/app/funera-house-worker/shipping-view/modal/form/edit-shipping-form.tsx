import type { FC } from 'react';
import {Dispatch, useEffect, useState} from 'react';
import {
   usePrepareFuneralContextContext
} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {shippingSchema} from '@src/app/funera-house-worker/shipping-view/modal/form/schema/shipping-schema';
import {editShippingById, fetchShippingById, IShippingPayload} from '@src/app/libs/api-calls/shipping-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {NumberField} from '@src/app/libs/components/form/number-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
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
   const {shippingPrice, setShippingPrice} = usePrepareFuneralContextContext();

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
         toast.success(dictionary.funeralHouseWorker.shippingTable.editSuccess);
         refetch();
         setIsEditModalOpen(false);
      }
   }, [isEditShippingSuccess]);

   console.log(formValues);


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
      const formValues = {
         ...values,
         price: shippingPrice,
      };
      mutate(formValues);
      actions.resetForm();
   };

   useEffect(() => {
      setFormValues(data);
      setShippingPrice(data?.price as number);
   }, [isFetchShippingByIdSuccess]);


   useEffect(() => {
      refetchShippingById().then(r => setFormValues(r.data) );
   }, [shippingId]);

   return (
      <>
         {formValues && (
            <FormWrapper<IShippingPayload> initialValues={formValues} onSubmit={onSubmit} validationSchema={shippingSchema} >
               <>
                  <InputField name="name" placeholder={dictionary.form.shippingName} />
                  <SelectField name="caravan" options={caravanOptions} placeholder={dictionary.form.selectDriver}/>
                  <NumberField name="distance" placeholder="Distance" />
                  <NumberField name="price" value={shippingPrice} disabled />
               </>
            </FormWrapper>
         )}
      </>
   );
};