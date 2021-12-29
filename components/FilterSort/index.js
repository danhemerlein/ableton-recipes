import CheckboxList from '@components/CheckboxList';
import Button from 'components/Button';
import { Field, Form, Formik } from 'formik';
import { getDefaultPostsList } from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';
import { P } from 'styles/elements/typography';

const SubmitButton = styled(Button)`
  margin-top: ${remHelper[8]};
`;

const ClearButton = styled(Button)`
  margin-left: ${remHelper[8]};
`;

const defaultValues = { filters: [], direction: 'desc' };

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
        initialValues={defaultValues}
        onSubmit={(values, { setSubmitting }) => {
          submitHandler(values.filters, values.direction);
          setSubmitting(false);
        }}
      >
        {({ values, resetForm }) => {
          const handleClear = async () => {
            resetForm(defaultValues);
            setPosts(await getDefaultPostsList());
          };
          return (
            <Form id="tags-filter">
              <P>filters</P>
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

              <P>sort</P>

              <P as="label" htmlFor="desc">
                newest first
              </P>

              <Field type="radio" name="direction" id="desc" value="desc" />

              <P as="label" htmlFor="asc">
                oldest first
              </P>

              <Field type="radio" name="direction" id="asc" value="" />

              <div>
                <SubmitButton
                  mode="secondary"
                  CTA="apply"
                  type="submit"
                ></SubmitButton>
              </div>

              {values.filters.length ? (
                <ClearButton
                  mode="primary"
                  CTA="clear"
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
