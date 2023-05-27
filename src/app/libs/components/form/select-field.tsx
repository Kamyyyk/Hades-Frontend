import {Select} from 'antd';
import {Option} from 'antd/es/mentions';
import {Field, FieldProps} from 'formik';


export interface TSelectField {
   value: string;
   label: string;
}

interface ISelectField {
   name: string;
   options?: TSelectField[] ;
   placeholder: string;
}

export const SelectField: React.FC<ISelectField> = ({name, options, placeholder}) => {
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
      } else {
         setFieldValue(name, selectValue);
      }
   };

   return (
      <div>
         <p>{placeholder}</p>
         <Field name={name} as="select">
            {({ field, form }: FieldProps) => {
               return (
                  <Select
                     style={{ width: '100%' }}
                     allowClear
                     onChange={(e) => onChange(e, form.setFieldValue, field.name)}
                     value={typeof field.value === 'object' ? field?.value?.id : field?.value}
                  >
                     {options?.map((option) => (
                        <Option key={option.value} value={option.value}>
                           {option.label}
                        </Option>
                     ))}
                  </Select>
               );
            }}
         </Field>
      </div>
   );
};