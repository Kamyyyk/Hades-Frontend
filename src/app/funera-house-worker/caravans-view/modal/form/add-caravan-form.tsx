import {Dispatch, FC, useEffect} from 'react';
import {ICaravanPayload, postCaravan} from '@src/app/libs/api-calls/caravan-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: ICaravanPayload = {
   licenceNumber: '',
   brand: '',
   model: '',
   driver: null
};


interface IAddCaravanForm {
   setIsAddModalOpen: Dispatch<boolean>;
   refetch: () => void
   driverOptions?: TSelectField[];
}

export const AddCaravanForm: FC<IAddCaravanForm> = ({setIsAddModalOpen, refetch, driverOptions}) => {
   
   const {mutate, isSuccess, isError, error} = useMutation({
      mutationKey: ['postCaravan'],
      mutationFn: (payload: ICaravanPayload) => postCaravan(payload)
   });
   
   useEffect(() => {
      if (isError && error instanceof Error) {
         toast.error(error.message);
      } 
   }, [isError]);

   useEffect(() => {
      if (isSuccess) {
         toast.success(dictionary.funeralHouseWorker.caravanTable.addSuccess);
         refetch();
         setIsAddModalOpen(false);
      }
   }, [isSuccess]);


   const onSubmit = (value: ICaravanPayload, actions: FormikHelpers<ICaravanPayload>) => {
      const formValues = {
         ...value,
         driver: value.driver,
      };
      mutate(formValues);
      actions.resetForm();
   };

   return (
      <FormWrapper<ICaravanPayload> initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen} >
         <>
            <InputField name="licenceNumber" placeholder={dictionary.form.licenceNumber}/>
            <InputField name="brand" placeholder={dictionary.form.brand}/>
            <InputField name="model" placeholder={dictionary.form.model}/>
            <SelectField name="driver" options={driverOptions} placeholder={dictionary.form.driver}  />
         </>
      </FormWrapper>
   );
};