import { useContext } from 'react';
import { above } from 'styles/utilities';
import Metatags from 'components/Metatags';
import { UserContext } from 'lib/context';
import CreateUserWithEmailAndPassword from './CreateUserWithEmailAndPassword';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';
import { SignOutButton } from './SignOutButton';
import { P } from 'styles/elements/typography';
import { UserNameForm } from './UserNameForm';
import styled from 'styled-components';
import { CenterContainer, FlexContainer } from 'styles/elements/containers';
import { remHelper } from 'lib/utilities/remHelper';
import LinkButton from '@components/LinkButton';

const StyledP = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const SignInParagraph = styled(P)`
  margin-top: ${remHelper[8]};
`;

const Enter = () => {
  const { user, username } = useContext(UserContext);
  return (
    <main>
      <Metatags title="user profile page" />

      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <CenterContainer direction="column">
          <CreateUserWithEmailAndPassword />

          <SignInParagraph textAlign="center">
            already have an account?&nbsp;
            <LinkButton mode="primary" HREF="/sign-in" CTA="sign in">
              sign in
            </LinkButton>
          </SignInParagraph>

          <StyledP textAlign="center">or</StyledP>

          <FlexContainer>
            <SignInWithGoogleButton />
          </FlexContainer>
        </CenterContainer>
      )}
    </main>
  );
};
export default Enter;
