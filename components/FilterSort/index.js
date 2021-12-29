import CheckboxList from '@components/CheckboxList';
import Button from 'components/Button';
import { Form, Formik } from 'formik';
import { getDefaultPostsList } from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';

const SubmitButton = styled(Button)`
  margin-top: ${remHelper[8]};
`;

const ClearButton = styled(Button)`
  margin-left: ${remHelper[8]};
`;

export default function Filter({
  submitHandler,
  tags,
  genres,
  plugins,
  setPosts,
}) {
  return (
    <>
      <Formik
        initialValues={{ filters: [] }}
        onSubmit={(values, { setSubmitting }) => {
          submitHandler(values.filters);
          setSubmitting(false);
        }}
      >
        {({ values, resetForm }) => {
          const handleClear = async () => {
            resetForm({ filters: [] });
            setPosts(await getDefaultPostsList());
          };
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

              <SubmitButton
                mode="secondary"
                CTA="apply filters"
                type="submit"
              ></SubmitButton>

              {values.filters.length ? (
                <ClearButton
                  mode="primary"
                  CTA="clear filters"
                  clickHandler={handleClear}
                ></ClearButton>
              ) : null}
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
