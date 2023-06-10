import {dictionary} from '@src/app/libs/locales/en';
import * as Yup from 'yup';
export const deceasedDocumentationSchema = Yup.object().shape({
   documentationNumber: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   morgue: Yup.object()
      .required(dictionary.form.error.fieldRequired)
});