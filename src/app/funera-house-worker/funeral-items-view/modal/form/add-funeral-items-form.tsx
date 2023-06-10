import {Dispatch, FC, useEffect, useState} from 'react';
import {
   funeralItemsSchema
} from '@src/app/funera-house-worker/funeral-items-view/modal/form/schema/funeral-items-schema';
import {IFuneralItemsPayload, postFuneralItem} from '@src/app/libs/api-calls/funeral-items-api';
import {FormWrapper} from '@src/app/libs/components/form/form-wrapper/form-wrapper';
import {InputField} from '@src/app/libs/components/form/input-field';
import {NumberField} from '@src/app/libs/components/form/number-field';
import {SelectField, TSelectField} from '@src/app/libs/components/form/select-field';
import {dictionary} from '@src/app/libs/locales/en';
import {Checkbox} from 'antd';
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

   const [isDescriptionTagSelected, setIsDescriptionTagSelected] = useState<boolean>(false);

   const {mutate, isSuccess, isError, error} = useMutation({
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

   useEffect(() => {
      if (isError && error instanceof Error) {
         toast.error(error.message);
      }
   }, [isError]);
   
   const onSubmit = async (value: IFuneralItemsPayload, actions: FormikHelpers<IFuneralItemsPayload> ) => {
      await mutate(value);
      actions.resetForm();
   };

   return (
      <FormWrapper initialValues={initialValues} onSubmit={onSubmit} setIsModalOpen={setIsAddModalOpen}  validationSchema={funeralItemsSchema}>
         <>
            <InputField name="containerName" placeholder={dictionary.form.containerName}/>
            <SelectField name="containerType" options={containerTypeOptions} placeholder={dictionary.form.containerType}  />
            <Checkbox className="form-checkbox" onClick={() => setIsDescriptionTagSelected(prevState => !prevState)}>Add description tag</Checkbox>
            {isDescriptionTagSelected && (
               <InputField name="descriptionPlate" placeholder="Description tag"/>
            )
            }
            <NumberField name="price" />
         </>
      </FormWrapper>
   );
};