import {Dispatch, FC, useEffect, useState} from 'react';
import {
   usePrepareFuneralContextContext
} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {fetchCemeteries} from '@src/app/libs/api-calls/cemetery-api';
import {editFuneralById, fetchFuneralById, IFuneralPayload} from '@src/app/libs/api-calls/funeral-api';
import {fetchFuneralItems} from '@src/app/libs/api-calls/funeral-items-api';
import {fetchMorgue} from '@src/app/libs/api-calls/morgue';
import {fetchShipping} from '@src/app/libs/api-calls/shipping-api';
import {DateField} from '@src/app/libs/components/form/date-field';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {NumberField} from '@src/app/libs/components/form/number-field';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
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

   const {price} = usePrepareFuneralContextContext();
   
   const {data, isSuccess, isError, error, refetch: refetchFuneralById} = useQuery({
      queryKey: ['fetchFuneralById'],
      queryFn: () => fetchFuneralById(funeralId)
   });
   
   useEffect(() => {
      if (isError && error instanceof Error) {
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

   const filteredCemeteries = cemeteriesData?.filter(elem => !elem.cemeteryPlaceOccupied);

   const cemeteriesOptions = filteredCemeteries?.map((elem) => {
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
         toast.success(dictionary.funeralHouseWorker.funeralTable.editSuccess);
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
                  <DateField name="funeralDate" placeholder={dictionary.form.funeralDate}/>
                  <SelectField name="status" placeholder={dictionary.form.status} options={funeralStatusOptions}/>
                  <SelectField name="placeOnCemetery" placeholder={dictionary.form.placeOnCemetery} options={cemeteriesOptions}/>
                  <SelectField name="morgue" placeholder={dictionary.form.deceased} options={ morgueOptions}/>
                  <SelectField name="container" placeholder={dictionary.form.container} options={funeralItemsOptions}/>
                  <SelectField name="shipping" options={shippingOptions} placeholder={dictionary.form.shipping} />
                  <NumberField name="price" disabled />
               </>
            </FormWrapper>
         )}

      </>
   );
};