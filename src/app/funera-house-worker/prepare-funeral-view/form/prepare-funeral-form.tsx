import {FC, useEffect} from 'react';
import {PrepareFuneralSuccess} from '@src/app/funera-house-worker/prepare-funeral-view/prepare-funeral-success/prepare-funeral-success';
import {fetchCemeteries} from '@src/app/libs/api-calls/cemetery-api';
import {IFuneralPayload, postFuneral} from '@src/app/libs/api-calls/funeral-api';
import {fetchFuneralItems } from '@src/app/libs/api-calls/funeral-items-api';
import {fetchMorgue} from '@src/app/libs/api-calls/morgue';
import {fetchShipping} from '@src/app/libs/api-calls/shipping-api';
import {DateField} from '@src/app/libs/components/form/date-field';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: IFuneralPayload = {
   funeralDate: '',
   status: '',
   price: null,
   placeOnCemetery: null,
   shipping: null,
   morgue: null,
   container: null,
};


export const PrepareFuneralForm: FC = () => {

   const {data: cemeteriesData, isError: isFetchCemeteriesError, error: fetchCemeteriesError} = useQuery({
      queryKey: ['fetchCemetery'],
      queryFn: fetchCemeteries
   });

   useEffect(() => {
      if (isFetchCemeteriesError && fetchCemeteriesError instanceof Error) {
         toast.error(fetchCemeteriesError.message);
      }
   }, [fetchCemeteriesError]);

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

   const {data, mutate, isSuccess, isError: isPostFuneralError, error: postFuneralError} = useMutation({
      mutationKey: ['postFuneral'],
      mutationFn: (payload: IFuneralPayload) => postFuneral(payload),
   });

   useEffect(() => {
      if (isPostFuneralError && postFuneralError instanceof Error) {
         toast.error(postFuneralError.message);
      }
   }, [postFuneralError]);

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

   const onSubmit = async (value: IFuneralPayload, actions: FormikHelpers<IFuneralPayload>) => {
      await mutate(value);
      actions.resetForm();
   };
    
   return (
      <>
         {isSuccess && data ? (
            <PrepareFuneralSuccess funeralId={data.id} />
         ) : (
            <>
               <h2>{dictionary.funeralHouseWorker.prepareFuneral.prepareFuneralTitle}</h2>
               <FormWrapper<IFuneralPayload> initialValues={initialValues} onSubmit={onSubmit}>
                  <>
                     <DateField name="funeralDate" placeholder={dictionary.form.funeralDate}/>
                     <SelectField name="status" placeholder={dictionary.form.status} options={funeralStatusOptions}/>
                     <InputField name="price" placeholder={dictionary.form.price}/>
                     <SelectField name="placeOnCemetery" placeholder={dictionary.form.placeOnCemetery} options={cemeteriesOptions}/>
                     <SelectField name="morgue" placeholder={dictionary.form.deceased} options={ morgueOptions}/>
                     <SelectField name="container" placeholder={dictionary.form.container} options={funeralItemsOptions}/>
                     <SelectField name="shipping" options={shippingOptions} placeholder={dictionary.form.shipping} />
                  </>
               </FormWrapper>
            </>
         )}

      </>
   );
};