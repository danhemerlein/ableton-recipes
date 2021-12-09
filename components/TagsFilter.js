import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllDocumentsInACollection } from '../lib/firebase';
import { P } from 'styles/elements/typography';
import { remHelper } from 'lib/utilities/remHelper';

const TagsList = styled.ul`
  margin: ${remHelper[8]} 0 ${remHelper[8]} 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

const TagLitItem = styled(P)`
  cursor: pointer;

  border: 1px solid black;
  padding: ${remHelper[8]};
  border-radius: 25%;
  display: inline;
  margin: 0 ${remHelper[8]};
  display: flex;
`;

const Tag = styled(Field)``;

export default function TagsFilter({ submitHandler }) {
  const [tags, setTags] = useState([]);

  useEffect(async () => {
    const statefulTags = await getAllDocumentsInACollection('tags');
    setTags(statefulTags);
  }, []);

  return (
    <>
      <P>tags filter</P>

      <Formik
        initialValues={{ tags: [] }}
        onSubmit={(values, { setSubmitting }) => {
          submitHandler(values.tags);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => {
          return (
            <Form id="tags-filter">
              <TagsList>
                {tags.map((tag) => {
                  return (
                    <TagLitItem key={tag.id} as="li">
                      <label htmlFor={tag.id}>{tag.id}</label>
                      <Tag
                        type="checkbox"
                        name="tags"
                        id={tag.id}
                        value={tag.id}
                      ></Tag>
                    </TagLitItem>
                  );
                })}
              </TagsList>

              <button type="submit">filter posts</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
