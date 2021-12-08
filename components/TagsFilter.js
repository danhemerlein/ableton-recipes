import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllDocumentsInACollection } from '../lib/firebase';

const TagsList = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

const TagLitItem = styled.li`
  border: 1px solid black;
  padding: 10px;
  border-radius: 25%;
  display: inline;
  margin: 0 10px;
  width: 20%;
  display: flex;
  cursor: pointer;
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
      <p>tags filter</p>

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
                    <TagLitItem>
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
