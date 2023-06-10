import {FC,useEffect, useState} from 'react';
import {
   prepareFuneralSchema
} from '@src/app/funera-house-worker/prepare-funeral-view/form/schema/prepare-funeral-schema';
import {PrepareFuneralSuccess} from '@src/app/funera-house-worker/prepare-funeral-view/prepare-funeral-success/prepare-funeral-success';
import {PriceComponent} from '@src/app/funera-house-worker/prepare-funeral-view/price-component/price-component';
import {usePrepareFuneralContextContext} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {fetchCemeteries} from '@src/app/libs/api-calls/cemetery-api';
import {IFuneralPayload, postFuneral} from '@src/app/libs/api-calls/funeral-api';
import {fetchFuneralItems } from '@src/app/libs/api-calls/funeral-items-api';
import {fetchMorgue} from '@src/app/libs/api-calls/morgue';
import {fetchShipping} from '@src/app/libs/api-calls/shipping-api';
import {DateField} from '@src/app/libs/components/form/date-field';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {Checkbox} from 'antd';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: IFuneralPayload = {
   funeralDate: '',
   status: 'OPEN',
   price: null,
   placeOnCemetery: null,
   shipping: null,
   morgue: null,
   container: null,
};

export const PrepareFuneralForm: FC = () => {

   const [isCreateReportSelected, setIsCreateReportSelected] = useState<boolean>(false);
   const {price, setPrice} = usePrepareFuneralContextContext();

   useEffect(() => {
      setPrice(0);
   }, []);

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

   const funeralStatusOptions = [
      {
         value: 'OPEN',
         label: dictionary.funeralHouseWorker.prepareFuneral.options.funeralStatus.open
      },
      {
         value: 'FINISHED',
         label:  dictionary.funeralHouseWorker.prepareFuneral.options.funeralStatus.finished
      },
      {
         value: 'IN_PROGRESS',
         label:  dictionary.funeralHouseWorker.prepareFuneral.options.funeralStatus.inProgress
      },
   ];

   const funeralTypeOptions = [
      {
         value: 'SECULAR',
         label:  dictionary.funeralHouseWorker.prepareFuneral.options.funeralType.secular
      },
      {
         value: 'CATHOLIC',
         label: dictionary.funeralHouseWorker.prepareFuneral.options.funeralType.catholic
      },
   ];


   const onSubmit = async (value: IFuneralPayload, actions: FormikHelpers<IFuneralPayload>) => {
      const formValues = {
         ...value,
         reportOrder: isCreateReportSelected,
         price: price
      };
      await mutate(formValues);
      actions.resetForm();
   };
    
   return (
      <>
         {isSuccess && data ? (
            <PrepareFuneralSuccess funeralId={data.id} data={data} />
         ) : (
            <>
               <div className="prepare-funeral-view-container">
                  <FormWrapper<IFuneralPayload> initialValues={initialValues} onSubmit={onSubmit} validationSchema={prepareFuneralSchema}>
                     <>
                        <h2>{dictionary.funeralHouseWorker.prepareFuneral.prepareFuneralTitle}</h2>
                        <Checkbox className="form-checkbox" onChange={() => setIsCreateReportSelected(prevState => !prevState)}>Create funeral report</Checkbox>
                        <DateField name="funeralDate" placeholder={dictionary.form.funeralDate}/>
                        <SelectField name="funeralType" options={funeralTypeOptions} placeholder={dictionary.form.funeralType} />
                        <SelectField name="status" placeholder={dictionary.form.status} options={funeralStatusOptions}/>
                        <SelectField name="placeOnCemetery" placeholder={dictionary.form.placeOnCemetery} options={cemeteriesOptions}/>
                        <SelectField name="morgue" placeholder={dictionary.form.deceased} options={ morgueOptions}/>
                        <SelectField name="container" placeholder={dictionary.form.container} options={funeralItemsOptions}/>
                        <SelectField name="shipping" options={shippingOptions} placeholder={dictionary.form.shipping} />
                        <PriceComponent/>
                     </>
                  </FormWrapper>
               </div>
            </>
         )}

      </>
   );
};