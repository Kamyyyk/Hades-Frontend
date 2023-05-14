import {Input} from 'antd';
import type { FieldProps } from 'formik';
import { Field } from 'formik';

interface IInputField {
   name: string;
   placeholder: string;
}


export const InputField: React.FC<IInputField> = ({name, placeholder}) => {
   return (
      <>
         <p>{placeholder}</p>
         <Field type="text" name={name}>
            {({ field }: FieldProps) => {
               return <Input {...field} />;
            }}
         </Field>
      </>

   );
};