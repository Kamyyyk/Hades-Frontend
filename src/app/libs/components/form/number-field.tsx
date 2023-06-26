import type { FC } from 'react';
import {
   usePrepareFuneralContextContext
} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {dictionary} from '@src/app/libs/locales/en';
import {InputNumber} from 'antd';
import {Field, FieldProps} from 'formik';

export interface IPriceField {
   name: string;
   placeholder?: string
   disabled?: boolean
   value?: number
}

export const NumberField: FC<IPriceField> = ({name, placeholder = 'Price', disabled = false, value}) => {

   const {setShippingPrice} = usePrepareFuneralContextContext();

   const onChange = (value: number | string | null, setFieldValue: (field: string, value: string) => void, name: string): void => {
      if (name === 'distance' && typeof value === 'number') {
         setShippingPrice(value * 4);
      }

      if (value !== null) {
         setFieldValue(name, value.toString());
      }
   };

   return (
      <div>
         <p className="form-placeholder">{placeholder === 'Price' ? dictionary.form.price : placeholder}</p>
         <Field name={name}>
            {({field, form}: FieldProps) => {
               return (
                  <>
                     <InputNumber disabled={disabled} onChange={(e) => onChange(e, form.setFieldValue, field.name)} controls={false} style={{width: 200}} precision={2} addonAfter={placeholder === 'Price' ? 'PLN' : 'KM'} value={value ? value : field.value}  />
                     {form.errors[field.name] && form.touched[field.name] && (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <p>{form.errors[field.name]}</p>
                     )}
                  </>
               );
            }}
         </Field>
      </div>
   );
};