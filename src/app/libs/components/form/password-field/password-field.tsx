import type { FC } from 'react';
import {generatePassword} from '@src/utils/heleprs/password-generator';
import {Button, Input} from 'antd';
import {Field, FieldProps} from 'formik';
import '@src/app/libs/components/form/password-field/password-field.scss';

interface IPasswordField {
   isGeneratePasswordVisible?: boolean
}

export const PasswordField: FC<IPasswordField> = ({isGeneratePasswordVisible = true}) => {

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
                     <Input.Password {...field} />
                     {isGeneratePasswordVisible && (
                        <Button className="passwordButton" onClick={() => onButtonChange(form.setFieldValue, field.name)}>Generate password</Button>
                     )}

                  </>
               );
            }}
         </Field>
      </>

   );
};