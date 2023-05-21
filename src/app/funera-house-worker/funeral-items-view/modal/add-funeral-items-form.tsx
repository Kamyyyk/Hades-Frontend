import {Dispatch, FC, useEffect} from 'react';
import {IFuneralItemsPayload, postFuneralItem} from '@src/app/libs/api-calls/funeral-items-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {SelectField} from '@src/app/libs/components/form/select-field';
import {FormikHelpers} from 'formik';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';

const initialValues: IFuneralItemsPayload = {
   containerName: '',
   containerType: ''
};

interface IAddFuneralItemsForm {
   setIsAddModalOpen: Dispatch<boolean>
   refetch: () => void
}

const containerType = [
   {
      label: 'Urn',
      value: 'URN'
   },
   {
      label: 'Coffin',
      value: 'COFFIN'
   }
];

export const AddFuneralItemsForm: FC<IAddFuneralItemsForm> = ({setIsAddModalOpen, refetch}) => {
   
   const {mutate, isSuccess} = useMutation({
      mutationKey: ['postFuneralItem'],
      mutationFn: (payload: IFuneralItemsPayload) => postFuneralItem(payload)
   });
   
   const onSubmit = (value: IFuneralItemsPayload, actions: FormikHelpers<IFuneralItemsPayload> ) => {
      mutate(value);
      toast.success('Successfully added new funeral item');
      actions.resetForm();
   };

   useEffect(() => {
      if (isSuccess) {
         refetch();
      }
   }, [isSuccess]);
   
   return (
      <FormWrapper initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen} >
         <>
            <InputField name="containerName" placeholder="Funeral item Name"/>
            <SelectField name="containerType" options={containerType} placeholder="Fineral item Type"  />
         </>
      </FormWrapper>
   );
};