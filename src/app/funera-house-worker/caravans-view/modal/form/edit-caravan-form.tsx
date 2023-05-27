import {Dispatch, FC, useEffect, useState} from 'react';
import {editCaravanById, fetchCaravanById, ICaravanPayload} from '@src/app/libs/api-calls/caravan-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
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
         toast.success('Successfully edited caravan row');
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
                  <InputField name="licenceNumber" placeholder="Licence Number"/>
                  <InputField name="brand" placeholder="Brand"/>
                  <InputField name="model" placeholder="Model"/>
                  {driverOptions && (
                     <SelectField name="driver" options={driverOptions} placeholder="Driver"  />
                  )}
               </>
            </FormWrapper>
         )}
      </>
   );
};