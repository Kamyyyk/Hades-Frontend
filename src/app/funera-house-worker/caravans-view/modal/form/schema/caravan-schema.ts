import {dictionary} from '@src/app/libs/locales/en';
import * as Yup from 'yup';
export const caravanSchema = Yup.object().shape({
   licenceNumber: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   brand: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   model: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   driver: Yup.object()
      .required(dictionary.form.error.fieldRequired),
});