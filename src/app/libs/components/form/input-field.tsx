import {FC} from 'react';
import {Input} from 'antd';
import type { FieldProps } from 'formik';
import { Field } from 'formik';
import '@src/app/libs/components/form/form.scss';

interface IInputField {
   name: string;
   placeholder: string;
   value?: string;
}


export const InputField: FC<IInputField> = ({name, placeholder, value}) => {
   return (
      <>
         <p className="form-placeholder">{placeholder}</p>
         <Field type="text" name={name}>
            {({ field, form }: FieldProps) => {
               if (value) return (
                  <>
                     <Input {...field} value={value} />
                     {form.errors[field.name] && form.touched[field.name] && (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <p className="field-error">{form.errors[field.name] }</p>
                     )}
                  </>

               );
               return (
                  <>
                     <Input size="middle" {...field}/>
                     {form.errors[field.name] && form.touched[field.name]  && (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <p className="field-error">{form.errors[field.name]}</p>
                     )}
                  </>
               ) ;
            }}
         </Field>
      </>

   );
};