import {FC} from 'react';
import {DatePicker} from 'antd';
import {Field, FieldProps} from 'formik';

interface IDateField {
   name: string,
   placeholder: string
}

export const DateField: FC<IDateField> = ({name, placeholder}) => {
   const dateFormat = 'YYYY-MM-DD';

   const onChange = (dateString: string, setFieldValue: (field: string, value: string) => void, name: string ) => {
      setFieldValue(name, dateString);
   };

   return (
      <>
         <p>{placeholder}</p>
         <Field name={name}>
            {({ field, form }: FieldProps) => {
               return <DatePicker onChange={(_, dateString) => onChange(dateString, form.setFieldValue, field.name)} format={ dateFormat} />;
            }}
         </Field>
      </>
   );
};