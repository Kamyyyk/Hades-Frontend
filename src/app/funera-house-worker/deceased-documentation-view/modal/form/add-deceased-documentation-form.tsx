import {Dispatch, useEffect} from 'react';
import {
   IDeceasedDocumentationPayload,
   postDeceasedDocumentation
} from '@src/app/libs/api-calls/deceased-documentation-api';
import {fetchMorgue} from '@src/app/libs/api-calls/morgue';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: IDeceasedDocumentationPayload = {
   name: '',
   morgue: null,
};

interface IAddDeceasedDocumentationForm {
   refetch: () => void;
   setIsAddModalOpen: Dispatch<boolean>
}

export const AddDeceasedDocumentationForm: React.FC<IAddDeceasedDocumentationForm> = ({refetch, setIsAddModalOpen}) => {

   const {data: morgueData} = useQuery({
      queryKey: ['fetchMorgue'],
      queryFn: fetchMorgue
   });
   
   const {mutate, isSuccess: isMutationSuccess } = useMutation({
      mutationKey: ['postDeceasedDocumentation'],
      mutationFn: (payload: IDeceasedDocumentationPayload) => postDeceasedDocumentation(payload)
   });

   const morgueOptions = morgueData?.map((elem) => {
      return {value: JSON.stringify(elem), label: JSON.stringify(elem)};
   });

   const onSubmit = (value: IDeceasedDocumentationPayload , actions: FormikHelpers<IDeceasedDocumentationPayload>) => {
      mutate(value);
      toast.success('Successfully added deceased documentation row');
      actions.resetForm();
   };
   
   useEffect(() => {
      if (isMutationSuccess) {
         refetch();
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