import type { FC } from 'react';
import {
   usePrepareFuneralContextContext
} from '@src/app/funera-house-worker/prepare-funeral-view/provider/PrepareFuneralProvider';
import {InputNumber} from 'antd';
import {Field, FieldProps} from 'formik';

export interface IPriceField {
   name: string;
   placeholder?: string
   disabled?: boolean
}

export const NumberField: FC<IPriceField> = ({name, placeholder = 'Price', disabled = false}) => {

   const {shippingPrice, setShippingPrice, distance, setDistance} = usePrepareFuneralContextContext();



   const onChange = (value: number | string | null, setFieldValue: (field: string, value: string) => void, name: string): void => {
      if (value !== null) {
         setFieldValue(name, value.toString());
      }
   };

   return (
      <div>
         <p>{placeholder}</p>
         <Field name={name}>
            {({field, form}: FieldProps) => {
               return (
                  <InputNumber disabled={disabled} onChange={(e) => onChange(e, form.setFieldValue, field.name)} controls={false} style={{width: 200}} precision={2} addonAfter={placeholder === 'Price' ? 'PLN' : 'KM'} value={field.value}  />
               );
            }}
         </Field>
      </div>
   );
};