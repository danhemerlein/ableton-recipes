import styled from 'styled-components';
import { above } from 'styles/utilities';

export const FlexContainer = styled.div`
  display: flex;
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ items }) => items && `align-items: ${items}`};
  ${({ direction }) => direction && `flex-direction: ${direction}`};
  ${({ wrap }) => wrap && `flex-wrap: ${wrap}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ width }) => width && `width: ${width}`};
`;

export const CenterContainer = styled(FlexContainer)`
  width: 100%;
  margin: 0 auto;

  ${above.desktop`
    width: 50%;
  `};
`;
