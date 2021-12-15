import { signInWithPopup } from 'firebase/auth';

import { auth, provider } from 'lib/firebase';
import Button from 'components/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  width: 24rem;
  margin: 0 auto;
`;

export function SignInWithGoogleButton() {
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider);
  };

  return (
    <StyledButton
      CTA={'sign in with google'}
      mode="secondary"
      clickHandler={signInWithGoogle}
    ></StyledButton>
  );
}
