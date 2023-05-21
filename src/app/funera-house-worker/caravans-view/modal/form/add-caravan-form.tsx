import {useEffect} from 'react';
import {ICaravanPayload, postCaravan} from '@src/app/libs/api-calls/caravan-api';
import {fetchDrivers} from '@src/app/libs/api-calls/driver-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: ICaravanPayload = {
   licenceNumber: '',
   brand: '',
   model: '',
   driver: null
};


interface IAddCaravanForm {
   setIsAddModalOpen: React.Dispatch<boolean>;
   refetch: () => void
}

export const AddCaravanForm: React.FC<IAddCaravanForm> = ({setIsAddModalOpen, refetch}) => {
   
   const {data, mutate, isSuccess} = useMutation({
      mutationKey: ['postCaravan'],
      mutationFn: (payload: ICaravanPayload) => postCaravan(payload)
   });

   const onSubmit = (value: ICaravanPayload, actions: FormikHelpers<ICaravanPayload>) => {
      const formValues = {
         ...value,
         driver: value.driver,
      };
      try {
         mutate(formValues);
      } catch (e) {
         toast.error('Error');
      } finally {
         toast.success('Successfully added new caravan');
         actions.resetForm();
      }
   };

   useEffect(() => {
      refetch();
   }, [isSuccess]);

   const {data: driverData} = useQuery({
      queryKey: ['fetchDrivers'],
      queryFn: fetchDrivers
   });

   const driverOptions = driverData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });

   return (
      <FormWrapper<ICaravanPayload> initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen} >
         <>
            <InputField name="licenceNumber" placeholder="Licence Number"/>
            <InputField name="brand" placeholder="Brand"/>
            <InputField name="model" placeholder="Model"/>
            {driverOptions && (
               <SelectField name="driver" options={driverOptions} placeholder="Driver"  />
            )}
         </>
      </FormWrapper>
   );
};