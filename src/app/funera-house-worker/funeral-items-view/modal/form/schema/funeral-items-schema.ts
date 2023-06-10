import {dictionary} from '@src/app/libs/locales/en';
import * as Yup from 'yup';
export const funeralItemsSchema = Yup.object().shape({
   containerName: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   containerType: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   price: Yup.number()
      .required(dictionary.form.error.fieldRequired),
});