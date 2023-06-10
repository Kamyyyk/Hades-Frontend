import {FC} from 'react';
import {DatePicker} from 'antd';
import dayjs from 'dayjs';
import {Field, FieldProps} from 'formik';
import '@src/app/libs/components/form/form.scss';

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
         <p className="form-placeholder">{placeholder}</p>
         <Field name={name}>
            {({ field, form }: FieldProps) => {
               return (
                  <>
                     <DatePicker onChange={(_, dateString) => onChange(dateString, form.setFieldValue, field.name)} format={dateFormat} value={field.value ? dayjs(field.value) : undefined}/>
                     {form.errors[field.name] && (
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