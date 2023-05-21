import {Dispatch, FC, useEffect} from 'react';
import {fetchCaravan} from '@src/app/libs/api-calls/caravan-api';
import {IShippingPayload, postShipping} from '@src/app/libs/api-calls/shipping-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

interface IAddShippingForm {
   setIsAddModalOpen: Dispatch<boolean>
   refetch: () => void;
}

const initialValues: IShippingPayload = {
   name: '',
   caravan: null
};

export const AddShippingForm: FC<IAddShippingForm> = ({setIsAddModalOpen, refetch}) => {
   const {data: caravanData} = useQuery({
      queryKey: ['fetchCaravan'],
      queryFn: fetchCaravan
   });

   const {mutate, isSuccess} = useMutation({
      mutationKey: 'postShipping',
      mutationFn: (payload: IShippingPayload) => postShipping(payload)
   });

   const onSubmit = (value: IShippingPayload, actions: FormikHelpers<IShippingPayload>) => {
      mutate(value);
      actions.resetForm();
      toast.success('Successfully added shipping row');
      setIsAddModalOpen(false);
   };
   
   useEffect(() => {
      if (isSuccess) {
         refetch();
      }
   }, [isSuccess]);

   const caravanOptions = caravanData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });


   return (
      <FormWrapper<IShippingPayload> initialValues={initialValues} onSubmit={onSubmit} >
         <>
            <InputField name="name" placeholder="Shipping Name" />
            {caravanOptions && (
               <SelectField name="caravan" options={caravanOptions} placeholder="Select driver" />
            )}
         </>
         
      </FormWrapper>
   );
};