import {dictionary} from '@src/app/libs/locales/en';
import * as Yup from 'yup';

export const morgueFormSchema = Yup.object().shape({
   name: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   surname: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   deathDate: Yup.date()
      .required(dictionary.form.error.fieldRequired)
      .min(Yup.ref('birthDate'), dictionary.form.validation.deathDateIsBeforeBornDate),
   dateArrived: Yup.date().required(dictionary.form.error.fieldRequired)
      .min(Yup.ref('deathDate'), dictionary.form.validation.deathDateIsAfterArrive)
      .required(dictionary.form.error.fieldRequired),
   sex: Yup.string()
      .required(dictionary.form.error.fieldRequired),
   birthDate: Yup.date().required(dictionary.form.error.fieldRequired),
});