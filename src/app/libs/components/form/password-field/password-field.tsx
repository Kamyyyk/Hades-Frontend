import type { FC } from 'react';
import {generatePassword} from '@src/utils/heleprs/password-generator';
import {Button, Input} from 'antd';
import {Field, FieldProps} from 'formik';
import '@src/app/libs/components/form/password-field/password-field.scss';


export const PasswordField: FC = () => {

   const onButtonChange = (setFieldValue: (field: string, value: string) => void, name: string) => {
      setFieldValue(name, generatePassword());
   };
   
   return (
      <>
         <p>Password</p>
         <Field type="text" name="password">
            {({ field, form }: FieldProps) => {
               return (
                  <>
                     <Input {...field} />
                     <Button className="passwordButton" onClick={() => onButtonChange(form.setFieldValue, field.name)}>Generate password</Button>
                  </>
               );
            }}
         </Field>
      </>

   );
};