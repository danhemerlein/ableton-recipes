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

  &:disabled {
    background: ${({ theme, mode }) => theme.button[mode].disabled};
    cursor: not-allowed;
    color: ${({ theme, mode }) => theme.button[mode].background};

    &:hover {
      background: ${({ theme, mode }) => theme.button[mode].disabled};
      color: ${({ theme, mode }) => theme.button[mode].background};
    }
  }

  &:hover {
    background: ${({ theme, mode }) => theme.button[mode].backgroundHover};
    color: ${({ theme, mode }) => theme.button[mode].colorHover};
  }
`;

const Button = ({ className, CTA, clickHandler, mode, disabled }) => {
  return (
    <StyledButton
      className={className}
      onClick={clickHandler}
      mode={mode}
      disabled={disabled}
    >
      {CTA}
    </StyledButton>
  );
};
export default Button;
