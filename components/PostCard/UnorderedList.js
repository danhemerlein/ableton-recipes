import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements/containers';
import { P } from 'styles/elements/typography';

const List = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled(P)`
  border: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagForeground};
  padding: ${remHelper[4]};
  margin: 0 ${remHelper[8]};
  border-radius: 100%;
  display: inline;
`;

const Container = styled(FlexContainer)`
  margin-top: ${remHelper[16]};
`;

export const UnorderedList = ({ title, data }) => {
  return (
    <Container>
      <P>{title}:</P>
      <List>
        {data.map((datum) => {
          return (
            <ListItem as="li" key={datum}>
              {datum}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};
