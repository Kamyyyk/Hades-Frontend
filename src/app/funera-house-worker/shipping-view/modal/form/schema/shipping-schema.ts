import {dictionary} from '@src/app/libs/locales/en';
import * as Yup from 'yup';
export const shippingSchema = Yup.object().shape({
   name: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   price: Yup.number()
      .required(dictionary.form.error.fieldRequired),
   distance: Yup.number()
      .required(dictionary.form.error.fieldRequired),
   caravan: Yup.object()
      .required(dictionary.form.error.fieldRequired)
});