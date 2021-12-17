import { FlexContainer } from 'styles/elements/containers';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';
import { P } from 'styles/elements/typography';
import { Field } from 'formik';

const List = styled.ul`
  margin: 0 0 ${remHelper[8]} 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const CheckboxListItem = styled.li`
  border: ${({ theme }) => theme.border};
  padding: ${remHelper[8]};
  border-radius: 25%;
  display: inline;
  margin: 0 ${remHelper[8]};
  width: 20%;
  display: flex;
  cursor: pointer;
`;

const StyledCheckbox = styled(Field)`
  cursor: pointer;
  width: ${remHelper[16]};
`;

const CheckboxList = ({ fieldValues, fieldName }) => {
  return (
    <fieldset>
      <legend>{fieldName}</legend>
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
    </fieldset>
  );
};
export default CheckboxList;
