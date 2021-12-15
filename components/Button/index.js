import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';
import { Span } from 'styles/elements/typography';

const StyledButton = styled.button`
  padding: ${remHelper[4]};
  cursor: pointer;
  background: ${({ theme, mode }) => theme.button[mode].background};
  border: ${({ theme, mode }) => theme.button[mode].border};
  color: ${({ theme, mode }) => theme.button[mode].color};

  transition: background 0.25s ease-in-out, color 0.25s ease-in-out;

  &:hover {
    background: ${({ theme, mode }) => theme.button[mode].backgroundHover};
    color: ${({ theme, mode }) => theme.button[mode].colorHover};
  }
`;

const Button = ({ className, CTA, clickHandler, mode }) => {
  return (
    <StyledButton className={className} onClick={clickHandler} mode={mode}>
      <Span>{CTA}</Span>
    </StyledButton>
  );
};
export default Button;
