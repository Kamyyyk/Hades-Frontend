import type { FC } from 'react';
import {Dispatch, useEffect, useState} from 'react';
import {
   editDeceasedDocumentationById, fetchDeceasedDocumentationById,
   IDeceasedDocumentationPayload
} from '@src/app/libs/api-calls/deceased-documentation-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

export interface IEditDeceasedDocumentationForm {
   refetch: () => void;
   setIsEditModalOpen: Dispatch<boolean>
   deceasedDocumentationId: number | undefined;
   morgueOptions?: TSelectField[];
}

export const EditDeceasedDocumentationForm: FC<IEditDeceasedDocumentationForm> = ({refetch, deceasedDocumentationId, setIsEditModalOpen, morgueOptions}) => {
   const [formValues, setFormValues] = useState<IDeceasedDocumentationPayload>();

   const {data, refetch: refetchDeceasedDocumentationById, isSuccess: isFetchDocumentationByIdSuccess, isError: isFetchDocumentationByIdError, error: fetchDocumentationByIdError} = useQuery({
      queryKey: ['fetchDeceasedDocumentationById'],
      queryFn: () => fetchDeceasedDocumentationById(deceasedDocumentationId)
   });
   
   useEffect(() => {
      if (isFetchDocumentationByIdError && fetchDocumentationByIdError instanceof Error) {
         toast.error(fetchDocumentationByIdError.message);
      }
   }, [isFetchDocumentationByIdError, fetchDocumentationByIdError ]);

   useEffect(() => {
      setFormValues(data);
   }, [isFetchDocumentationByIdSuccess]);

   useEffect(() => {
      refetchDeceasedDocumentationById();
   }, [deceasedDocumentationId]);
   
   const {mutate, isSuccess: isEditDeceasedDocumentationByIdSuccess, isError: isEditDeceasedDocumentationByIdError, error: editDeceasedDocumentationByIdError} = useMutation({
      mutationKey: ['editDeceasedDocumentationById'],
      mutationFn: (payload: IDeceasedDocumentationPayload) => editDeceasedDocumentationById(deceasedDocumentationId, payload)
   });

   useEffect(() => {
      if (isEditDeceasedDocumentationByIdSuccess) {
         toast.success('Successfully edited deceased documentation row');
         refetch();
         setIsEditModalOpen(false);
      }
   }, [isEditDeceasedDocumentationByIdSuccess]);
   
   useEffect(() => {
      if (isEditDeceasedDocumentationByIdError && editDeceasedDocumentationByIdError instanceof Error) {
         toast.error(editDeceasedDocumentationByIdError.message);
      }
   }, [isEditDeceasedDocumentationByIdError, editDeceasedDocumentationByIdError ]);


   const onSubmit = (values: IDeceasedDocumentationPayload, actions: FormikHelpers<IDeceasedDocumentationPayload>) => {
      mutate(values);
      actions.resetForm();
   };
   
   return (
      <> 
         {formValues && (
            <FormWrapper initialValues={formValues} onSubmit={onSubmit} setIsModalOpen={setIsEditModalOpen} >
               <>
                  <InputField name="name" placeholder="Name"/>
                  {morgueOptions && (
                     <SelectField name="morgue" options={morgueOptions} placeholder="Morgue" />
                  )}
               </>
            </FormWrapper>
         )}

      </>
   );
};