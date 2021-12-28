import CheckboxList from '@components/CheckboxList';
import Button from 'components/Button';
import { Form, Formik } from 'formik';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-top: ${remHelper[8]};
`;

export default function Filter({ submitHandler, tags, genres, plugins }) {
  return (
    <>
      <Formik
        initialValues={{ filters: [] }}
        onSubmit={(values, { setSubmitting }) => {
          submitHandler(values.filters);
          setSubmitting(false);
        }}
      >
        {() => {
          return (
            <Form id="tags-filter">
              <CheckboxList
                fieldValues={tags}
                fieldName="filters"
                legend="tags"
              />

              <CheckboxList
                fieldValues={plugins}
                fieldName="filters"
                legend="plugins"
              />

              <CheckboxList
                fieldValues={genres}
                fieldName="filters"
                legend="genres"
              />

              <StyledButton
                mode="secondary"
                CTA="apply"
                type="submit"
              ></StyledButton>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
