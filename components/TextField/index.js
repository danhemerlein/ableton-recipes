import { Field, ErrorMessage } from 'formik';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';
import { P } from 'styles/elements/typography';

const StyledField = styled(Field)`
  width: 100%;
  border: ${({ theme }) => theme.textInput.border};
  color: ${({ theme }) => theme.textInput.color};
  padding: ${remHelper[4]};
`;

const TextField = ({ type, name, id, value, changeHandler }) => {
  return (
    <>
      <StyledField
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={changeHandler}
      />
      <P>
        <ErrorMessage name={name} />
      </P>
    </>
  );
};
export default TextField;
