import {Dispatch, FC, useEffect} from 'react';
import {
   deceasedDocumentationSchema
} from '@src/app/funera-house-worker/deceased-documentation-view/modal/form/schema/deceased-documentation-schema';
import {
   IDeceasedDocumentationPayload,
   postDeceasedDocumentation
} from '@src/app/libs/api-calls/deceased-documentation-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {generateDocumentationNumber} from '@src/utils/heleprs/generate-documentation-number';
import {getFormatDate} from '@src/utils/heleprs/get-format-date';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: IDeceasedDocumentationPayload = {
   documentationNumber: '',
   morgue: null,
};

interface IAddDeceasedDocumentationForm {
   refetch: () => void;
   setIsAddModalOpen: Dispatch<boolean>
   morgueOptions?: TSelectField[];
}

export const AddDeceasedDocumentationForm: FC<IAddDeceasedDocumentationForm> = ({refetch, setIsAddModalOpen, morgueOptions}) => {
   const generatedDocumentationNumber = generateDocumentationNumber();

   useEffect(() => {
      initialValues.documentationNumber = generatedDocumentationNumber;
   }, []);

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
      const formValues = {
         ...value,
         documentationNumber: generatedDocumentationNumber,
         documentationCreateDate: getFormatDate()
      };
      await mutate(formValues);
      actions.resetForm();
   };

   useEffect(() => {
      if (isMutationSuccess) {
         toast.success(dictionary.funeralHouseWorker.deceasedDocumentationTable.addSuccess);
         refetch();
         setIsAddModalOpen(false);
      }
   }, [isMutationSuccess]);


   return (
      <FormWrapper initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen} validationSchema={deceasedDocumentationSchema}>
         <>
            <InputField name="documentationNumber" placeholder={dictionary.form.documentationNumber} disabled />
            <SelectField name="morgue" options={morgueOptions} placeholder={dictionary.form.morgue} />
         </>
      </FormWrapper>
   );
};