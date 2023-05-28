import type { FC } from 'react';
import {Dispatch, useEffect, useState} from 'react';
import {editMorgue, fetchMorgueById, IMorguePayload} from '@src/app/libs/api-calls/morgue';
import {DateField} from '@src/app/libs/components/form/date-field';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

export interface IEditMorgueForm {
   setIsEditModalOpen: Dispatch<boolean>
   morgueId: number | undefined;
   refetch: () => void;
}

export const EditMorgueForm: FC<IEditMorgueForm> = ({setIsEditModalOpen, refetch, morgueId}) => {
   const [formValues, setFormValues ] = useState<IMorguePayload>();

   const {data, refetch: refetchMorgueById, isSuccess: isFetchMorgueByIdSuccess, isError: isFetchMorgueByIdError, error: fetchMorgueByIdError} = useQuery({
      queryKey: ['fetchMorgueById'],
      queryFn: () => fetchMorgueById(morgueId)
   });

   useEffect(() => {
      if (isFetchMorgueByIdError && fetchMorgueByIdError instanceof Error) {
         toast.error(fetchMorgueByIdError.message);
      }
   }, [isFetchMorgueByIdError, fetchMorgueByIdError]);

   useEffect(() => {
      if (isFetchMorgueByIdSuccess) {
         setFormValues(data);
      }
   }, [isFetchMorgueByIdSuccess]);
   
   const {mutate, isSuccess: isEditMorgueSuccess, isError: isEditMorgueError, error: editMorgueError} = useMutation({
      mutationKey: ['editMorgueById'],
      mutationFn: (payload: IMorguePayload ) => editMorgue(payload, morgueId)
   });

   useEffect(() => {
      if (isEditMorgueError && editMorgueError instanceof Error) {
         toast.error(editMorgueError.message);
      }
   }, [isEditMorgueError, editMorgueError]);

   useEffect(() => {
      if (isEditMorgueSuccess) {
         toast.success(dictionary.morgueWorker.deceasedTable.editSuccess);
         refetch();
         setIsEditModalOpen(false);
      }
   }, [isEditMorgueSuccess]);

   useEffect(() => {
      refetchMorgueById();
   }, [morgueId]);

   const onSubmit = (value: IMorguePayload, actions: FormikHelpers<IMorguePayload>) => {
      mutate(value);
      actions.resetForm();
   };

   return (
      <>
         {formValues && (
            <FormWrapper<IMorguePayload> initialValues={formValues} onSubmit={onSubmit}>
               <>
                  <InputField name="name" placeholder={dictionary.form.name} />
                  <InputField name="surname" placeholder={dictionary.form.surname} />
                  <DateField name="dateArrived" placeholder={dictionary.form.dateArrived}/>
                  <InputField name="sex" placeholder={dictionary.form.sex}/>
                  <DateField name="birthDate" placeholder={dictionary.form.birthDate} />
                  <DateField name="deathDate" placeholder={dictionary.form.deathDate} />
               </>
            </FormWrapper>
         )}

      </>
   );
};