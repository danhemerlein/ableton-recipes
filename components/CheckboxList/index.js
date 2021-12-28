import { Field } from 'formik';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements/containers';
import { Legend, P } from 'styles/elements/typography';

const StyledFieldset = styled.fieldset`
  margin-top: ${remHelper[8]};
`;

const List = styled.ul`
  margin: ${remHelper[8]} 0 ${remHelper[8]} 0;
  padding: 0;
  width: 100%;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const CheckboxListItem = styled.li`
  border: ${({ theme }) => theme.border};
  display: inline;
  padding: ${remHelper[8]};
  margin: ${remHelper[8]};
  width: calc(20% - ${remHelper[16]});
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledCheckbox = styled(Field)`
  cursor: pointer;
  width: ${remHelper[16]};
`;

const CheckboxList = ({ fieldValues, fieldName, legend }) => {
  return (
    <StyledFieldset>
      <Legend>{legend ? legend : fieldName}</Legend>
      <FlexContainer items="center">
        <List>
          {fieldValues.map((value) => {
            return (
              <CheckboxListItem key={value.id}>
                <P as="label" htmlFor={value.id}>
                  {value.id}
                </P>
                <StyledCheckbox
                  type="checkbox"
                  name={fieldName}
                  id={value.id}
                  value={value.id}
                />
              </CheckboxListItem>
            );
          })}
        </List>
      </FlexContainer>
    </StyledFieldset>
  );
};
export default CheckboxList;
