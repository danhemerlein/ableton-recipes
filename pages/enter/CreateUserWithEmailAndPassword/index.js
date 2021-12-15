import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from 'lib/firebase';
import createUserWithEmailAndPasswordModel from './createUserWithEmailAndPasswordModel';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FlexContainer } from 'styles/elements/containers';
import schema from './validationSchema';
import { P, H2 } from 'styles/elements/typography';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';
import Button from '@components/Button';
import toast from 'react-hot-toast';

const StyledFieldset = styled.fieldset`
  margin: ${remHelper[8]} 0;
`;

const StyledLabel = styled(P)`
  display: block;
  margin-bottom: ${remHelper[4]};
`;

const StyledField = styled(Field)`
  width: 100%;
  border: ${({ theme }) => theme.textInput.border};
  color: ${({ theme }) => theme.textInput.color};
  padding: ${remHelper[4]};
`;

const StyledButton = styled(Button)`
  margin: ${remHelper[8]} auto;
  width: 24rem;
`;

const CreateUserWithEmailAndPassword = ({}) => {
  const { formId, formField } = createUserWithEmailAndPasswordModel;

  const errorToastStyles = {
    icon: '🔴',
    style: {
      color: '#C23B22',
      border: '1px solid #C23B22',
    },
  };

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).catch(function (
      error
    ) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        toast('the password is too weak', errorToastStyles);
      } else {
        toast(errorMessage, errorToastStyles);
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', passwordReentry: '' }}
        validationSchema={schema[0]}
        onSubmit={(values, { setSubmitting }) => {
          if (values.password === values.passwordReentry) {
            createUser(values.email, values.password);
          } else {
            toast("passwords don't match please try again", errorToastStyles);
          }

          setSubmitting(false);
        }}
      >
        <Form id={formId}>
          <H2 textAlign="center">create account with email</H2>

          <StyledFieldset>
            <StyledLabel as="label" htmlFor="email">
              {formField.email.label}
            </StyledLabel>

            <StyledField type="email" name="email" id="email" />

            <P>
              <ErrorMessage name="email" />
            </P>
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
            <P>
              <ErrorMessage name="password" />
            </P>
          </StyledFieldset>

          <StyledFieldset>
            <StyledLabel as="label" htmlFor="passwordReentry">
              {formField.passwordReentry.label}
            </StyledLabel>

            <StyledField
              type="password"
              name="passwordReentry"
              id="passwordReentry"
            ></StyledField>
          </StyledFieldset>
          <FlexContainer>
            <StyledButton CTA="create account" mode="primary" />
          </FlexContainer>
        </Form>
      </Formik>
    </>
  );
};
export default CreateUserWithEmailAndPassword;
