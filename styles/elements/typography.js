import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';
import { libertine, flipps } from 'styles/utilities';

export const H1 = styled.h1`
  font-size: ${remHelper[32]};
  ${libertine};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
`;

export const H2 = styled.h2`
  font-size: ${remHelper[24]};
  ${libertine};

  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
`;

export const P = styled.p`
  font-size: ${remHelper[16]};
  ${libertine};

  ${({ lowercase }) => lowercase && `text-transform: lowercase`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
`;

export const Span = styled.span`
  font-size: ${remHelper[16]};
  ${libertine};
`;
