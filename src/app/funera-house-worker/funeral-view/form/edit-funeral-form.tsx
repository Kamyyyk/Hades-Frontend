import {Dispatch, FC, useEffect, useState} from 'react';
import {fetchCemeteries} from '@src/app/libs/api-calls/cemetery-api';
import {editFuneralById, fetchFuneralById, IFuneralPayload} from '@src/app/libs/api-calls/funeral-api';
import {fetchFuneralItems} from '@src/app/libs/api-calls/funeral-items-api';
import {fetchMorgue} from '@src/app/libs/api-calls/morgue';
import {fetchShipping} from '@src/app/libs/api-calls/shipping-api';
import {DateField} from '@src/app/libs/components/form/date-field';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

interface IEditFuneralForm {
   funeralId: number | undefined;
   refetch: () => void;
   setIsEditModalOpen: Dispatch<boolean>;
}

const funeralStatusOptions = [
   {
      value: 'OPEN',
      label: 'OPEN'
   },
   {
      value: 'FINISHED',
      label: 'FINISHED'
   },
   {
      value: 'IN_PROGRESS',
      label: 'IN_PROGRESS'
   },
];

export const EditFuneralForm: FC<IEditFuneralForm> = ({funeralId, setIsEditModalOpen, refetch}) => {
   const [formValues, setFormValues] = useState<IFuneralPayload>();
   
   const {data, isSuccess, isError, error, refetch: refetchFuneralById} = useQuery({
      queryKey: ['fetchFuneralById'],
      queryFn: () => fetchFuneralById(funeralId)
   });
   
   useEffect(() => {
      if (isError && error instanceof  Error) {
         toast.error(error.message);
      }
   }, [isError, error]);

   useEffect(() => {
      setFormValues(data);
   }, [isSuccess]);
   
   useEffect(() => {
      refetchFuneralById;
   }, [funeralId]);

   const {mutate, isSuccess: isEditFuneralByIdSuccess, isError: isEditFuneralByIdError, error: editFuneralByIdError} = useMutation({
      mutationKey: ['editFuneralById'],
      mutationFn: (payload: IFuneralPayload) => editFuneralById(payload, funeralId)
   });
   
   useEffect(() => {
      if (isEditFuneralByIdError && editFuneralByIdError instanceof Error) {
         toast.error(editFuneralByIdError.message);
      }
   }, [isEditFuneralByIdError, editFuneralByIdError ]);
   
   const {data: cemeteriesData} = useQuery({
      queryKey: ['fetchCemetery'],
      queryFn: fetchCemeteries
   });

   const {data: shippingData} = useQuery({
      queryKey: ['fetchShipping'],
      queryFn: fetchShipping
   });

   const {data: morgueData} = useQuery({
      queryKey: ['fetchDeceased'],
      queryFn: fetchMorgue
   });

   const {data: funeralItemsData} = useQuery({
      queryKey: ['fetchFuneralItems'],
      queryFn: fetchFuneralItems
   });

   const cemeteriesOptions = cemeteriesData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });

   const morgueOptions = morgueData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });

   const funeralItemsOptions = funeralItemsData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });

   const shippingOptions = shippingData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });
   
   
   useEffect(() => {
      if (isEditFuneralByIdSuccess) {
         toast.success('Successfully edited funeral');
         refetch();
         setIsEditModalOpen(false);
      }
   }, [isEditFuneralByIdSuccess]);
   
   const onSubmit = (values: IFuneralPayload, actions: FormikHelpers<IFuneralPayload>) => {
      mutate(values);
      actions.resetForm();
   };
   
   return (
      <>
         {formValues && (
            <FormWrapper<IFuneralPayload> initialValues={formValues} onSubmit={onSubmit}>
               <>
                  <DateField name="funeralDate" placeholder="Funeral date"/>
                  <SelectField name="status" placeholder="Funeral status" options={funeralStatusOptions}/>
                  <InputField name="price" placeholder="Funeral price"/>
                  <SelectField name="placeOnCemetery" placeholder="Place on cemetery" options={cemeteriesOptions}/>
                  <SelectField name="morgue" placeholder="Deceased" options={ morgueOptions}/>
                  <SelectField name="container" placeholder="Container" options={funeralItemsOptions}/>
                  <SelectField name="shipping" options={shippingOptions} placeholder="Shipping" />
               </>
            </FormWrapper>
         )}

      </>
   );
};