import styled from 'styled-components';
import { libertine } from 'styles/utilities';
import { remHelper } from 'lib/utilities/remHelper';

const StyledButton = styled.button`
  padding: ${remHelper[4]};
  cursor: pointer;
  background: ${({ theme, mode }) => theme.button[mode].background};
  border: ${({ theme, mode }) => theme.button[mode].border};
  color: ${({ theme, mode }) => theme.button[mode].color};

  font-size: ${remHelper[16]};

  transition: background 0.25s ease-in-out, color 0.25s ease-in-out;

  ${libertine}

  &:hover {
    background: ${({ theme, mode }) => theme.button[mode].backgroundHover};
    color: ${({ theme, mode }) => theme.button[mode].colorHover};
  }
`;

const Button = ({ className, CTA, clickHandler, mode }) => {
  return (
    <StyledButton className={className} onClick={clickHandler} mode={mode}>
      {CTA}
    </StyledButton>
  );
};
export default Button;
