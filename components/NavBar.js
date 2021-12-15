import Link from 'next/link';
import { flipps } from 'styles/utilities';
import { useContext } from 'react';
import { UserContext } from 'lib/context';
import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';
import { P, H1 } from 'styles/elements/typography';

const StyledNav = styled.nav`
  height: ${remHelper[32]};
`;

const Headline = styled(H1)`
  ${flipps};
  font-size: ${remHelper[16]};
`;

const UL = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const NavBar = ({}) => {
  const { user, username } = useContext(UserContext);

  return (
    <StyledNav>
      <UL>
        <li>
          <Headline>
            <Link href="/">ableton recipes</Link>
          </Headline>
        </li>

        {/* user is signed in and has a username */}
        {username && (
          <>
            <P as="li">
              <Link href={`/${username}`}>view profile</Link>
            </P>
          </>
        )}

        {/* user is not signed in OR has not created a user name */}
        {!username && (
          <P as="li">
            <Link href="/sign-in">log in</Link>
            <span>&nbsp;/&nbsp;</span>
            <Link href="/enter">sign up</Link>
          </P>
        )}
      </UL>
    </StyledNav>
  );
};
export default NavBar;
