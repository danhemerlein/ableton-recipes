import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllDocumentsInACollection } from '../lib/firebase';
import { P } from 'styles/elements/typography';
import { remHelper } from 'lib/utilities/remHelper';
import Button from 'components/Button';

const TagsList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const TagLitItem = styled(P)`
  cursor: pointer;
  border: ${({ theme }) => theme.border};
  padding: ${remHelper[8]};

  display: inline;
  margin-top: ${remHelper[8]};
  margin-right: ${remHelper[8]};
  margin-left: ${remHelper[8]};
  display: flex;
`;

const StyledButton = styled(Button)`
  margin-top: ${remHelper[8]};
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

              <StyledButton
                mode="secondary"
                CTA="apply filters"
                type="submit"
              ></StyledButton>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
