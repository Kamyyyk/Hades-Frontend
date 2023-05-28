import {Dispatch, FC, useEffect, useState} from 'react';
import {editCaravanById, fetchCaravanById, ICaravanPayload} from '@src/app/libs/api-calls/caravan-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

interface IEditCaravanForm {
   setIsEditCaravanOpen: Dispatch<boolean>;
   caravanId: number | undefined;
   refetch: () => void;
   driverOptions?: TSelectField[]
}

export const EditCaravanForm: FC<IEditCaravanForm> = ({caravanId, setIsEditCaravanOpen, refetch, driverOptions}) => {
   const [formValues, setFormValues ] = useState<ICaravanPayload>();


   const {data, isSuccess: isFetchCaravanByIdSuccess, refetch: refetchCaravanById} = useQuery({
      refetchOnWindowFocus: false,
      queryKey: ['fetchCaravanById'],
      queryFn: () => fetchCaravanById(caravanId)
   });

   const {mutate, isSuccess: isEditCaravanSuccess, isError: isEditCaravanError, error: editCaravanError} = useMutation({
      mutationKey: ['editCaravan'],
      mutationFn: (payload: ICaravanPayload) => editCaravanById(payload, caravanId)
   });
   
   useEffect(() => {
      if (isEditCaravanSuccess) {
         toast.success(dictionary.funeralHouseWorker.caravanTable.editSuccess);
         setIsEditCaravanOpen(false);
         refetch();
      }
   }, [isEditCaravanSuccess]);
   
   useEffect(() => {
      if (isEditCaravanError && editCaravanError instanceof Error) {
         toast.error(editCaravanError.message);
      }
   });

   useEffect(() => {
      setFormValues(data);
   }, [isFetchCaravanByIdSuccess]);

   useEffect(() => {
      refetchCaravanById();
   }, [caravanId]);

   const onSubmit = (value: ICaravanPayload, actions: FormikHelpers<ICaravanPayload>) => {
      mutate(value);
      actions.resetForm();
      setIsEditCaravanOpen(false);
   };
   
   return (
      <>
         {formValues && (
            <FormWrapper<ICaravanPayload> initialValues={formValues} onSubmit={onSubmit}>
               <>
                  <InputField name="licenceNumber" placeholder={dictionary.form.licenceNumber}/>
                  <InputField name="brand" placeholder={dictionary.form.brand}/>
                  <InputField name="model" placeholder={dictionary.form.model}/>
                  <SelectField name="driver" options={driverOptions} placeholder={dictionary.form.driver}  />
               </>
            </FormWrapper>
         )}
      </>
   );
};