import {dictionary} from '@src/app/libs/locales/en';
import * as Yup from 'yup';
export const prepareFuneralSchema = Yup.object().shape({
   funeralDate: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   status: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   funeralType: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   morgue: Yup.object()
      .required(dictionary.form.error.fieldRequired),
   placeOnCemetery: Yup.object()
      .required(dictionary.form.error.fieldRequired),
   container: Yup.object()
      .required(dictionary.form.error.fieldRequired),
   shipping: Yup.object()
      .required(dictionary.form.error.fieldRequired)
});