import type {Dispatch, FC} from 'react';
import {useEffect, useState} from 'react';
import {
   editFuneralItemById,
   fetchFuneralItemById,
   IFuneralItemsPayload
} from '@src/app/libs/api-calls/funeral-items-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

export interface IEditFuneralItemsForm {
    setIsEditModalOpen: Dispatch<boolean>;
    funeralItemId: number | undefined;
    refetch: () => void;
    containerTypeOptions?: TSelectField[]
}

export const EditFuneralItemsForm: FC<IEditFuneralItemsForm> = ({setIsEditModalOpen, funeralItemId, refetch, containerTypeOptions}) => {
   const [formValues, setFormValues] = useState<IFuneralItemsPayload>();
   
   const {mutate, isSuccess: isEditFuneralItemSuccess, isError: isEditFuneralItemError, error: editFuneralItemError} = useMutation({
      mutationKey: ['editFuneralItemById'],
      mutationFn: (payload: IFuneralItemsPayload) => editFuneralItemById(payload, funeralItemId)
   });

   const {data, refetch: refetchFuneralItemById, isSuccess: isFetchFuneralItemByIdSuccess, isError: isFetchFuneralItemByIdError, error: fetchFuneralItemByIdError} = useQuery({
      queryKey: ['fetchFuneralItemById'],
      queryFn: () => fetchFuneralItemById(funeralItemId)
   });

   useEffect(() => {
      if (isEditFuneralItemSuccess) {
         toast.success('Successfully edited funeral item');
         refetch();
         setIsEditModalOpen(false);
      }

   }, [isEditFuneralItemSuccess]);
   
   useEffect(() => {
      if (isEditFuneralItemError && editFuneralItemError instanceof Error) {
         toast.error(editFuneralItemError.message);
      }
   }, [isEditFuneralItemError, editFuneralItemError]);

   useEffect(() => {
      if (isFetchFuneralItemByIdSuccess) {
         setFormValues(data);
      }
   }, [isFetchFuneralItemByIdSuccess]);
   
   useEffect(() => {
      if (isFetchFuneralItemByIdError && fetchFuneralItemByIdError instanceof Error) {
         toast.error(fetchFuneralItemByIdError.message);
      }
   }, [isFetchFuneralItemByIdError, fetchFuneralItemByIdError ] );

   useEffect(() => {
      refetchFuneralItemById();
   }, [funeralItemId]);

   const onSubmit = (values: IFuneralItemsPayload, actions: FormikHelpers<IFuneralItemsPayload>) => {
      mutate(values);
      actions.resetForm();
   };

   return (
      <>
         {formValues && (
            <FormWrapper initialValues={formValues} onSubmit={onSubmit} setIsModalOpen={setIsEditModalOpen} >
               <>
                  <InputField name="containerName" placeholder="Funeral item Name"/>
                  <SelectField name="containerType" options={containerTypeOptions} placeholder="Fineral item Type"  />
               </>
            </FormWrapper>
         )}
      </>
   );
};