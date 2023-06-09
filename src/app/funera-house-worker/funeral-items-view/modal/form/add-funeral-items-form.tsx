import {Dispatch, FC, useEffect} from 'react';
import {IFuneralItemsPayload, postFuneralItem} from '@src/app/libs/api-calls/funeral-items-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {NumberField} from '@src/app/libs/components/form/number-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: IFuneralItemsPayload = {
   containerName: '',
   containerType: '',
   price: 0
};

interface IAddFuneralItemsForm {
   setIsAddModalOpen: Dispatch<boolean>
   refetch: () => void
   containerTypeOptions?: TSelectField[]
}

export const AddFuneralItemsForm: FC<IAddFuneralItemsForm> = ({setIsAddModalOpen, refetch, containerTypeOptions}) => {
   
   const {mutate, isSuccess} = useMutation({
      mutationKey: ['postFuneralItem'],
      mutationFn: (payload: IFuneralItemsPayload) => postFuneralItem(payload)
   });

   useEffect(() => {
      if (isSuccess) {
         toast.success(dictionary.funeralHouseWorker.funeralItemsTable.addSuccess);
         refetch();
         setIsAddModalOpen(false);
      }
   }, [isSuccess]);
   
   const onSubmit = (value: IFuneralItemsPayload, actions: FormikHelpers<IFuneralItemsPayload> ) => {
      mutate(value);
      actions.resetForm();
   };

   return (
      <FormWrapper initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen} >
         <>
            <InputField name="containerName" placeholder={dictionary.form.containerName}/>
            <SelectField name="containerType" options={containerTypeOptions} placeholder={dictionary.form.containerType}  />
            <NumberField name="price" />
         </>
      </FormWrapper>
   );
};