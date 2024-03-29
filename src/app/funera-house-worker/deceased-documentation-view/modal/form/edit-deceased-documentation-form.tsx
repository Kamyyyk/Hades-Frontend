import type { FC } from 'react';
import {Dispatch, useEffect, useState} from 'react';
import {
   editDeceasedDocumentationById, fetchDeceasedDocumentationById,
   IDeceasedDocumentationPayload
} from '@src/app/libs/api-calls/deceased-documentation-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {getFormatDate} from '@src/utils/heleprs/get-format-date';
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
      refetchDeceasedDocumentationById().then(r => setFormValues(r.data));
   }, [deceasedDocumentationId]);
   
   const {mutate, isSuccess: isEditDeceasedDocumentationByIdSuccess, isError: isEditDeceasedDocumentationByIdError, error: editDeceasedDocumentationByIdError} = useMutation({
      mutationKey: ['editDeceasedDocumentationById'],
      mutationFn: (payload: IDeceasedDocumentationPayload) => editDeceasedDocumentationById(deceasedDocumentationId, payload)
   });

   useEffect(() => {
      if (isEditDeceasedDocumentationByIdSuccess) {
         toast.success(dictionary.funeralHouseWorker.deceasedDocumentationTable.editSuccess);
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
      const formValues = {
         ...values,
         documentationEditDate: getFormatDate()
      };
      mutate(formValues);
      actions.resetForm();
   };
   
   return (
      <> 
         {formValues && (
            <FormWrapper initialValues={formValues} onSubmit={onSubmit} setIsModalOpen={setIsEditModalOpen} >
               <>
                  <InputField name="documentationNumber" placeholder={dictionary.form.documentationNumber}/>
                  <SelectField name="morgue" options={morgueOptions} placeholder={dictionary.form.morgue} />
               </>
            </FormWrapper>
         )}

      </>
   );
};