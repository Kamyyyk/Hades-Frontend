import {dictionary} from '@src/app/libs/locales/en';
import * as Yup from 'yup';
export const cemeterySchema = Yup.object().shape({
   cemeteryName: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   address: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   price: Yup.number()
      .required(dictionary.form.error.fieldRequired),
});