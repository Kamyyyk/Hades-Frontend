import type {Dispatch, FC} from 'react';
import {useEffect} from 'react';
import {IMorguePayload, postMorgue} from '@src/app/libs/api-calls/morgue';
import {DateField} from '@src/app/libs/components/form/date-field';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {dictionary} from '@src/app/libs/locales/en';
import {morgueFormSchema} from '@src/app/morgue-worker/morgue-view/modal/form/schema/morgue-form-schema';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

export interface IAddMorgueForm {
   setIsAddModalOpen: Dispatch<boolean>
   refetch: () => void;
   isModalOpen?: boolean;
}

const initialValues: IMorguePayload = {
   name: '',
   surname: '',
   dateArrived: '',
   sex: '',
   birthDate: '',
   deathDate: ''
};

export const AddMorgueForm: FC<IAddMorgueForm> = ({setIsAddModalOpen, refetch }) => {

   const {mutate , isSuccess: isPostMorgueSuccess, isError: isPostMorgueError, error: postMorgueError } = useMutation({
      mutationKey: ['postMorgue'],
      mutationFn: (payload: IMorguePayload) => postMorgue(payload)
   });

   useEffect(() => {
      if (isPostMorgueError && postMorgueError instanceof Error) {
         toast.error(postMorgueError.message);
      }
   }, [isPostMorgueError, postMorgueError]);

   useEffect(() => {
      if (isPostMorgueSuccess) {
         toast.success(dictionary.morgueWorker.deceasedTable.addSuccess);
         refetch();
         setIsAddModalOpen(false);
      }
   }, [isPostMorgueSuccess]);

   const onSubmit = async (value: IMorguePayload, actions: FormikHelpers<IMorguePayload>) => {
      await mutate(value);
      actions.resetForm();
   };

   return (
      <>
         <FormWrapper<IMorguePayload> initialValues={initialValues} onSubmit={onSubmit} validationSchema={morgueFormSchema} setIsModalOpen={setIsAddModalOpen}>
            <>   
               <InputField name="name" placeholder={dictionary.form.name} />
               <InputField name="surname" placeholder={dictionary.form.surname} />
               <InputField name="sex" placeholder={dictionary.form.sex}/>
               <DateField name="birthDate" placeholder={dictionary.form.birthDate} />
               <DateField name="deathDate" placeholder={dictionary.form.deathDate} />
               <DateField name="dateArrived" placeholder={dictionary.form.dateArrived}/>
            </>
         </FormWrapper>
      </>
   );
};