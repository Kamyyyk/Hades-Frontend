import {Dispatch, FC, useEffect} from 'react';
import {IShippingPayload, postShipping} from '@src/app/libs/api-calls/shipping-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {NumberField} from '@src/app/libs/components/form/number-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

interface IAddShippingForm {
   setIsAddModalOpen: Dispatch<boolean>
   refetch: () => void;
   caravanOptions?: TSelectField[];
}

const initialValues: IShippingPayload = {
   name: '',
   caravan: null,
   price: 0,
   distance: 0
};

export const AddShippingForm: FC<IAddShippingForm> = ({setIsAddModalOpen, refetch, caravanOptions} ) => {

   const {mutate, isSuccess, isError, error} = useMutation({
      mutationKey: ['postShipping'],
      mutationFn: (payload: IShippingPayload) => postShipping(payload)
   });
   
   useEffect(() => {
      if (isError && error instanceof Error) {
         toast.error(error.message);
      }
   }, [isError, error ]);
   

   const onSubmit = (value: IShippingPayload, actions: FormikHelpers<IShippingPayload>) => {
      mutate(value);
      actions.resetForm();
   };
   
   useEffect(() => {
      if (isSuccess) {
         toast.success(dictionary.funeralHouseWorker.shippingTable.addSuccess);
         refetch();
         setIsAddModalOpen(false);
      }
   }, [isSuccess]);

   
   return (
      <FormWrapper<IShippingPayload> initialValues={initialValues} onSubmit={onSubmit} >
         <>
            <InputField name="name" placeholder={dictionary.form.shippingName} />
            <SelectField name="caravan" options={caravanOptions} placeholder={dictionary.form.selectDriver}/>
            <NumberField name="distance" placeholder="Distance" />
            <NumberField name="price" />
         </>
      </FormWrapper>
   );
};