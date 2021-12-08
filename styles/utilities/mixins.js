import { css } from 'styled-components';

export const fullBleed = ({
  top = false,
  right = false,
  bottom = false,
  left = false,
  space,
} = {}) => css`
  ${top && `margin-top: -${space}rem`};
  ${right && `margin-right: -${space}rem`};
  ${bottom && `margin-bottom: -${space}rem`};
  ${left && `margin-left: -${space}rem`};
`;

export const anchorColor = ({
  color = '#FFF',
  textDecoration = 'none',
  textDecorationHover = 'underline',
} = {}) => css`
  ${textDecoration && `text-decoration: ${textDecoration}`};
  text-decoration-color: ${color};
  color: ${color};

  &:visited {
    ${textDecoration && `text-decoration: ${textDecoration}`};
    color: ${color};
  }

  &:active {
    ${textDecoration && `text-decoration: ${textDecoration}`};
    color: ${color};
  }

  &:hover {
    ${textDecorationHover && `text-decoration: ${textDecorationHover}`};

    color: ${color};
  }
`;
