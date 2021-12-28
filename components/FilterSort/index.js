import CheckboxList from '@components/CheckboxList';
import Button from 'components/Button';
import { Form, Formik } from 'formik';
import { getAllDocumentsInACollection } from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-top: ${remHelper[8]};
`;

export default function TagsFilter({ submitHandler }) {
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(async () => {
    const statefulTags = await getAllDocumentsInACollection('tags');
    const statefulGenres = await getAllDocumentsInACollection('genres');
    setTags(statefulTags);
    setGenres(statefulGenres);
  }, []);

  return (
    <>
      <Formik
        initialValues={{ tags: [], genres: [] }}
        onSubmit={(values, { setSubmitting }) => {
          submitHandler(values.tags);
          setSubmitting(false);
        }}
      >
        {() => {
          return (
            <Form id="tags-filter">
              <CheckboxList fieldValues={tags} fieldName="tags" />
              <CheckboxList fieldValues={genres} fieldName="genres" />

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
