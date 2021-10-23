import { createUserWithEmailAndPassword } from '@firebase/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { auth } from '../../../lib/firebase';
import createUserWithEmailAndPasswordModel from './createUserWithEmailAndPasswordModel';
import schema from './validationSchema';

const CreateUserWithEmailAndPassword = ({}) => {
  const { formId, formField } = createUserWithEmailAndPasswordModel;

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).catch(function (
      error
    ) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema[0]}
        onSubmit={(values, { setSubmitting }) => {
          createUser(values.email, values.password);
          setSubmitting(false);
        }}
      >
        <Form id={formId}>
          <label htmlFor="email">{formField.email.label}</label>

          <Field type="email" name="email" id="email" />

          <ErrorMessage name="email"></ErrorMessage>

          <label htmlFor="password">{formField.password.label}</label>
          <Field type="password" name="password" id="password"></Field>
          <ErrorMessage name="password"></ErrorMessage>
          <button class="btn-green">create account with email</button>
        </Form>
      </Formik>
    </>
  );
};
export default CreateUserWithEmailAndPassword;
