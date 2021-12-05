import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ items }) => items && `align-items: ${items}`};
  ${({ direction }) => direction && `flex-direction: ${direction}`};
  ${({ wrap }) => wrap && `flex-wrap: ${wrap}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ width }) => width && `width: ${width}`};
`;
