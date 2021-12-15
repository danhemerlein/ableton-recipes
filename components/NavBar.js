import Link from 'next/link';
import { flipps, rainy_hearts } from 'styles/utilities';
import { useContext } from 'react';
import { UserContext } from 'lib/context';
import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';
import { P, H1 } from 'styles/elements/typography';
import LinkButton from './LinkButton';
import { anchorColor } from 'styles/utilities';

const StyledNav = styled.nav`
  margin-bottom: ${remHelper[16]};
`;

const Headline = styled(H1)`
  ${flipps};
  font-size: ${remHelper[16]};

  a {
    ${({ theme, mode }) => {
      return anchorColor({
        color: theme.button[mode].color,
        textDecoration: 'none',
        textDecorationHover: 'none',
      });
    }}
  }
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
          <Headline mode="primary">
            <Link href="/">ableton recipes</Link>
          </Headline>
        </li>

        {/* user is signed in and has a username */}
        {username && (
          <li>
            <LinkButton
              CTA="view profile"
              mode="primary"
              HREF={`/${username}`}
            />
          </li>
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
