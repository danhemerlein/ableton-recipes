import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';
import { P } from 'styles/elements/typography';

const StyledNav = styled.nav`
  height: ${remHelper[32]};
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
        <P as="li">
          <Link href="/">ableton recipes</Link>
        </P>

        {/* user is signed in and has a username */}
        {username && (
          <>
            <P as="li">
              <Link href="/admin">view admin panel</Link>
            </P>

            <P as="li">
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt="" />
              </Link>
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
