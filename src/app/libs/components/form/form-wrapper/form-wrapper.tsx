import {Button} from 'antd';
import {Form, Formik, FormikHelpers, FormikValues} from 'formik';
import '@src//app/libs/components/form/form-wrapper/form-wrapper.scss';


interface IFormWrapper<TInitialValues> {
   children: JSX.Element
   initialValues: TInitialValues;
   onSubmit: (values: TInitialValues, actions: FormikHelpers<TInitialValues>) => void;
   setIsModalOpen: React.Dispatch<boolean>;
}


export const FormWrapper= <TInitialValues extends FormikValues,>({children, initialValues, onSubmit, setIsModalOpen}: IFormWrapper<TInitialValues>): JSX.Element => {
   return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} >
         <Form>
            {children}
            <div className="form__wrapper">
               <Button className="form__wrapper__button" htmlType="submit" onClick={() => setIsModalOpen(false)}>Submit</Button>
            </div>
         </Form>
      </Formik>
   );
};