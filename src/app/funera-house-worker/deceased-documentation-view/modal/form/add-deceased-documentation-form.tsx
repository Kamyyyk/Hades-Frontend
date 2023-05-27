import {Dispatch, FC, useEffect} from 'react';
import {
   IDeceasedDocumentationPayload,
   postDeceasedDocumentation
} from '@src/app/libs/api-calls/deceased-documentation-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: IDeceasedDocumentationPayload = {
   name: '',
   morgue: null,
};

interface IAddDeceasedDocumentationForm {
   refetch: () => void;
   setIsAddModalOpen: Dispatch<boolean>
   morgueOptions?: TSelectField[];
}

export const AddDeceasedDocumentationForm: FC<IAddDeceasedDocumentationForm> = ({refetch, setIsAddModalOpen, morgueOptions}) => {

   const {mutate, isSuccess: isMutationSuccess, isError, error } = useMutation({
      mutationKey: ['postDeceasedDocumentation'],
      mutationFn: (payload: IDeceasedDocumentationPayload) => postDeceasedDocumentation(payload)
   });

   useEffect(() => {
      if (isError && error instanceof Error) {
         toast.error(error.message);
      }
   }, [isError, error]);


   const onSubmit = async (value: IDeceasedDocumentationPayload , actions: FormikHelpers<IDeceasedDocumentationPayload>) => {
      await mutate(value);
      actions.resetForm();
   };

   useEffect(() => {
      if (isMutationSuccess) {
         toast.success('Successfully added deceased documentation row');
         refetch();
         setIsAddModalOpen(false);
      }
   }, [isMutationSuccess]);


   return (
      <FormWrapper initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen} >
         <>
            <InputField name="name" placeholder="Name"/>
            {morgueOptions && (
               <SelectField name="morgue" options={morgueOptions} placeholder="Morgue" />
            )}
         </>
      </FormWrapper>
   );
};