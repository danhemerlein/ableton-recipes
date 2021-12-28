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

export default function Filter({ submitHandler }) {
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [plugins, setPlugins] = useState([]);

  useEffect(async () => {
    const statefulTags = await getAllDocumentsInACollection('tags');
    const statefulGenres = await getAllDocumentsInACollection('genres');
    const statefulPlugins = await getAllDocumentsInACollection('plugins');
    setTags(statefulTags);
    setGenres(statefulGenres);
    setPlugins(statefulPlugins);
  }, []);

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
