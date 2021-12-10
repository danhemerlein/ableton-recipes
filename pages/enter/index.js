import { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../../lib/context';
import CreateUserWithEmailAndPassword from './CreateUserWithEmailAndPassword';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';
import { SignOutButton } from './SignOutButton';
import { above } from 'styles/utilities';
import { P } from 'styles/elements/typography';
import { UserNameForm } from './UserNameForm';
import styled from 'styled-components';
import { CenterContainer, FlexContainer } from 'styles/elements/containers';
import { remHelper } from 'lib/utilities/remHelper';

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
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <CenterContainer direction="column">
          <CreateUserWithEmailAndPassword />

          <SignInParagraph>
            already have an account?&nbsp;
            <Link href="sign-in">sign in</Link>
          </SignInParagraph>

          <StyledP>or</StyledP>

          <SignInWithGoogleButton />
        </CenterContainer>
      )}
    </main>
  );
};
export default Enter;
