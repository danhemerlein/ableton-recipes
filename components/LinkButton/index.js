import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';
import { anchorColor } from 'styles/utilities';
import { rainy_hearts } from 'styles/utilities';

const StyledLink = styled.a`
  padding: ${remHelper[4]};

  background: ${({ theme, mode }) => theme.button[mode].background};
  border: ${({ theme, mode }) => theme.button[mode].border};

  font-size: ${remHelper[16]};

  ${rainy_hearts};

  transition: background 0.25s ease-in-out, color 0.25s ease-in-out;

  ${({ theme, mode }) => {
    return anchorColor({
      color: theme.button[mode].color,
      textDecoration: 'none',
      textDecorationHover: 'none',
    });
  }}

  &:hover {
    background: ${({ theme, mode }) => theme.button[mode].backgroundHover};
    color: ${({ theme, mode }) => theme.button[mode].colorHover};
  }
`;

const LinkButton = ({ className, CTA, HREF, mode }) => {
  return (
    <StyledLink className={className} href={HREF} mode={mode}>
      {CTA}
    </StyledLink>
  );
};
export default LinkButton;
