import {FC} from 'react';
import {usePrepareFuneralContextContext} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {Select} from 'antd';
import {Option} from 'antd/es/mentions';
import {Field, FieldProps} from 'formik';
import '@src/app/libs/components/form/form.scss';

export interface TSelectField {
   value: string;
   label: string;
}

interface ISelectField {
   name: string;
   options?: TSelectField[] ;
   placeholder: string;
}

export const SelectField: FC<ISelectField> = ({name, options, placeholder}) => {
   const {setPrice} = usePrepareFuneralContextContext();

   const isJsonString = (str: string) => {
      try {
         const json = JSON.parse(str);
         return (typeof json === 'object');
      } catch (e) {
         return false;
      }
   };

   const onChange = (selectValue: string, setFieldValue: (field: string, value: string) => void, name: string): void => {

      if (isJsonString(selectValue)) {
         setFieldValue(name, JSON.parse(selectValue));
         if (JSON.parse(selectValue).price !== undefined) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setPrice((prevState: number) => JSON.parse(selectValue).price + prevState);
         }
      } else {
         setFieldValue(name, selectValue);
      }
   };

   return (
      <div>
         <p className="form-placeholder">{placeholder}</p>
         <Field name={name} as="select">
            {({ field, form }: FieldProps) => {
               return (
                  <>
                     <Select
                        style={{ width: '100%' }}
                        allowClear
                        onChange={(e) => onChange(e, form.setFieldValue, field.name)}
                        value={field.value !== null && typeof field.value === 'object' ? JSON.stringify(field.value) : field?.value}
                     >
                        {options?.map((option) => (
                           <Option key={option.value} value={option.value}>
                              {option.label}
                           </Option>
                        ))}
                     </Select>
                     {form.errors[field.name] && (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <p className="field-error">{form.errors[field.name]}</p>
                     )}
                  </>
               );
            }}
         </Field>
      </div>
   );
};