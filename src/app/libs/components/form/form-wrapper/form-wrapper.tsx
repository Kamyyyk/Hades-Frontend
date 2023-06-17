import {Dispatch} from 'react';
import {dictionary} from '@src/app/libs/locales/en';
import {Button} from 'antd';
import {Form, Formik, FormikHelpers, FormikValues} from 'formik';
import '@src//app/libs/components/form/form-wrapper/form-wrapper.scss';
import Yup from 'yup';

interface IFormWrapper<TInitialValues> {
   children: JSX.Element
   initialValues: TInitialValues;
   onSubmit: (values: TInitialValues, actions: FormikHelpers<TInitialValues>) => void;
   validationSchema?: Yup.ObjectSchema<any>;
   setIsModalOpen?: Dispatch<boolean>;
}

export const FormWrapper= <TInitialValues extends FormikValues,>({children, initialValues, onSubmit, setIsModalOpen, validationSchema}: IFormWrapper<TInitialValues>): JSX.Element => {

   const onClick = () => {
      if (setIsModalOpen) {
         setIsModalOpen(false);
      }
   };

   return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
         {({isValid}) => {
            return (
               <Form className="form">
                  <div className="form__wrapper">
                     {children}
                     <div className="form__button__container">
                        <Button disabled={!isValid} className="form__button__container--button" htmlType="submit" onClick={() => setIsModalOpen ? onClick : {} }>{dictionary.common.submit}</Button>
                     </div>
                  </div>
               </Form>
            );
         }}
      </Formik>
   );
};