import { useRouter } from 'next/dist/client/router';
import { auth } from 'lib/firebase';
import Button from '@components/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-left: auto;
  width: 9rem;
`;

export function SignOutButton() {
  const router = useRouter();
  const handleClick = () => {
    auth.signOut();
    router.push('/');
  };
  return (
    <StyledButton CTA="log out" mode="secondary" clickHandler={handleClick}>
      sign out
    </StyledButton>
  );
}
