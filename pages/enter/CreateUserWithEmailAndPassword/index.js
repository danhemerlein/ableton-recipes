import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../../lib/firebase';
import createUserWithEmailAndPasswordModel from './createUserWithEmailAndPasswordModel';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import schema from './validationSchema';
import { P, H2 } from 'styles/elements/typography';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';

const StyledFieldset = styled.fieldset`
  margin: ${remHelper[8]} 0;
`;

const StyledLabel = styled(P)`
  display: block;
  margin-bottom: ${remHelper[4]};
`;

const StyledField = styled(Field)`
  width: 100%;
`;

const StyledButton = styled.button`
  margin: ${remHelper[8]} 0;
`;

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
          <>
            <H2>create account with email</H2>

            <StyledFieldset>
              <StyledLabel as="label" htmlFor="email">
                {formField.email.label}
              </StyledLabel>
              <StyledField type="email" name="email" id="email" />
              <ErrorMessage name="email"></ErrorMessage>
            </StyledFieldset>

            <StyledFieldset>
              <StyledLabel as="label" htmlFor="password">
                {formField.password.label}
              </StyledLabel>
              <StyledField
                type="password"
                name="password"
                id="password"
              ></StyledField>
              <ErrorMessage name="password"></ErrorMessage>
            </StyledFieldset>

            <StyledButton>create account</StyledButton>
          </>
        </Form>
      </Formik>
    </>
  );
};
export default CreateUserWithEmailAndPassword;
