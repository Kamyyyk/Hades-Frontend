import {FC} from 'react';
import {Input} from 'antd';
import type { FieldProps } from 'formik';
import { Field } from 'formik';
import '@src/app/libs/components/form/form.scss';

interface IInputField {
   name: string;
   placeholder: string;
   value?: string;
   disabled?: boolean;
}


export const InputField: FC<IInputField> = ({name, placeholder, value, disabled = false}) => {
   
   return (
      <>
         <p className="form-placeholder">{placeholder}</p>
         <Field type="text" name={name}>
            {({ field, form }: FieldProps) => {
               return (
                  <>
                     <Input size="middle" {...field}  value={value ?? form.values[field.name]} disabled={disabled}/>
                     {form.errors[field.name] && form.touched[field.name] && (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <p className="field-error">{form.errors[field.name]}</p>
                     )}
                  </>
               );
            }}
         </Field>
      </>

   );
};