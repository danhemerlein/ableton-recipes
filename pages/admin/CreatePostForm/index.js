import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import { formId } from './createPostFormModel';
import defaultValues from './defaultValues';
import schema from './validationSchema';

const TagsList = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const TextInput = styled.input`
  margin: 20px 0px;
`;

const PublishedContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  width: 25%;
`;

const CreatePostForm = ({ submitHandler, tags }) => {
  return (
    <Formik
      initialValues={defaultValues[0]}
      validationSchema={schema[0]}
      onSubmit={(values, { setSubmitting }) => {
        submitHandler(values);
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, isSubmitting }) => {
        return (
          <Form id={formId}>
            <FlexContainer>
              <label htmlFor="title">title</label>
              <Field type="text" name="title" id="title" />
              <ErrorMessage name="title" />
            </FlexContainer>

            <FlexContainer>
              <label htmlFor="link">link</label>
              <Field type="text" name="link" name="link"></Field>
              <ErrorMessage name="link" />
            </FlexContainer>

            <FlexContainer>
              <label htmlFor="published">published</label>

              <Field type="checkbox" name="published" id="published" />
            </FlexContainer>

            <TagsList>
              {tags.map((tag) => {
                return (
                  <>
                    <TagLitItem>
                      <label htmlFor={tag.id}>{tag.id}</label>
                      <input type="checkbox" name="tags" id={tag.id} />
                    </TagLitItem>
                  </>
                );
              })}
            </TagsList>

            <p>
              <strong>Slug:</strong> {slug}
            </p>
            <button type="submit" className="btn-green">
              create New Post
            </button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        );
      }}
    </Formik>
  );
};
export default CreatePostForm;
