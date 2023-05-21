import {FC} from 'react';
import {fetchCemeteries} from '@src/app/libs/api-calls/cemetery-api';
import {IFuneralPayload, postFuneral} from '@src/app/libs/api-calls/funeral-api';
import {fetchFuneralItems } from '@src/app/libs/api-calls/funeral-items-api';
import {fetchMorgue} from '@src/app/libs/api-calls/morgue';
import {fetchShipping} from '@src/app/libs/api-calls/shipping-api';
import {DateField} from '@src/app/libs/components/form/date-field';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {Button} from 'antd';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';

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
   const navigate = useNavigate();

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

   const {data, mutate, isSuccess} = useMutation({
      mutationKey: ['postFuneral'],
      mutationFn: (payload: IFuneralPayload) => postFuneral(payload)
   });

   console.log(data);

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

   const onSubmit = (value: IFuneralPayload, actions: FormikHelpers<IFuneralPayload>) => {
      mutate(value);
      console.log(value);
      console.log(actions);
   };
    
   return (
      <>
         {isSuccess ? (
            <div>
               <p>Successfully prepared funeral</p>
               <Button onClick={() => navigate(`/funeral/${data.id}`)}>View added funeral</Button>
               <Button onClick={() => navigate('prepare-funeral')}>Prepare another funeral</Button>
            </div> 
         ) : (
            <FormWrapper<IFuneralPayload> initialValues={initialValues} onSubmit={onSubmit}>
               <>
                  <DateField name="funeralDate" placeholder="Funeral date"/>
                  <SelectField name="status" placeholder="Funeral status" options={funeralStatusOptions}/>
                  <InputField name="price" placeholder="Funeral price"/>
                  {cemeteriesOptions && (
                     <SelectField name="placeOnCemetery" placeholder="Place on cemetery" options={cemeteriesOptions}/>
                  )}
                  {morgueOptions && (
                     <SelectField name="morgue" placeholder="Deceased" options={ morgueOptions}/>
                  )}
                  {funeralItemsOptions && (
                     <SelectField name="container" placeholder="Container" options={funeralItemsOptions}/>
                  )}
                  {shippingOptions && (
                     <SelectField name="shipping" options={shippingOptions} placeholder="Shipping" />
                  )}
               </>
            </FormWrapper>
         )}

      </>
   );
};