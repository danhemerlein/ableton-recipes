import signInwithEmailAndPasswordModel from './signInWithEmailAndPasswordModel';
import { useRouter } from 'next/dist/client/router';
import { above, errorToastStyles } from 'styles/utilities';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import schema from './validationSchema';
import { P, H2 } from 'styles/elements/typography';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';
import { CenterContainer, FlexContainer } from 'styles/elements/containers';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import Button from 'components/Button';

const Container = styled(FlexContainer)`
  width: 100%;
  margin: 0 auto;

  ${above.tablet`
    width: 50%;
  `};
`;

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

const SignInPage = ({}) => {
  const { formId, formField } = signInwithEmailAndPasswordModel;
  const auth = getAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema[0]}
      onSubmit={(values, { setSubmitting }) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // signed in
            router.push(`/`);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast(
              `error code ${errorCode} message ${errorMessage}`,
              errorToastStyles
            );
          });
        setSubmitting(false);
      }}
    >
      <CenterContainer direction="column">
        <Form id={formId}>
          <H2 textAlign="center">sign in with email</H2>

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
              <ErrorMessage name="password"></ErrorMessage>
            </P>
          </StyledFieldset>

          <FlexContainer>
            <StyledButton CTA="sign in" mode="primary" type="submit" />
          </FlexContainer>
        </Form>
      </CenterContainer>
    </Formik>
  );
};
export default SignInPage;
