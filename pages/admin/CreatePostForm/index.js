import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useRouter } from 'next/dist/client/router';
import _ from 'lodash';
import styled from 'styled-components';
import { formId } from './createPostFormModel';
import defaultValues from './defaultValues';
import schema from './validationSchema';
import toast from 'react-hot-toast';

import { auth, firestore } from 'lib/firebase';
import { UserContext } from 'lib/context';
import { useContext } from 'react';
import { FlexContainer } from 'styles/elements/containers';
import { remHelper } from 'lib/utilities/remHelper';
import { doc } from '@firebase/firestore';
import { serverTimestamp, addDoc, collection } from '@firebase/firestore';

const FormFieldContainer = styled(FlexContainer)`
  margin: ${remHelper[16]} 0;
`;

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

const TagCheckbox = styled(Field)`
  cursor: pointer;
  width: ${remHelper[16]};
`;

const CreatePostForm = ({ tags, authors }) => {
  const { username } = useContext(UserContext);
  const router = useRouter();

  // Create a new post in firestore
  const createPost = async (formValues) => {
    const uid = auth.currentUser.uid;

    const userRef = doc(firestore, 'users', uid);

    // ensure slug is URL safe
    const slug = encodeURI(_.kebabCase(title));

    // Tip: give all fields a default value here
    const data = {
      username,
      uid,
      title: formValues.title,
      link: formValues.link,
      published: formValues.published,
      tags: formValues.tags,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await addDoc(collection(userRef, 'posts'), data);

    toast.success('Post created!');
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={schema[0]}
      onSubmit={(values, { setSubmitting }) => {
        createPost(values);
        setSubmitting(false);
        // Imperative navigation after doc is set
        router.push(`/admin/${slug}`);
      }}
    >
      {({ values, errors, touched, isSubmitting }) => {
        console.log(values);
        return (
          <Form id={formId}>
            <FormFieldContainer direction="column">
              <label htmlFor="title">title</label>
              <Field type="text" name="title" id="title" />
              <ErrorMessage name="title" />
            </FormFieldContainer>

            <FormFieldContainer direction="column">
              <label htmlFor="link">link</label>
              <Field type="text" name="link"></Field>
              <ErrorMessage name="link" />
            </FormFieldContainer>

            <label htmlFor="author">author</label>

            <Field as="select" name="author" id="author">
              <option value="">- select an anthor -</option>
              {authors.map((author) => {
                return (
                  <option value={author.name} key={author.name}>
                    {author.name}
                  </option>
                );
              })}
            </Field>

            <FormFieldContainer>
              <TagsList>
                {tags.map((tag) => {
                  return (
                    <TagLitItem key={tag.id}>
                      <label htmlFor={tag.id}>{tag.id}</label>
                      <TagCheckbox
                        type="checkbox"
                        name="tags"
                        id={tag.id}
                        value={tag.id}
                      />
                    </TagLitItem>
                  );
                })}
              </TagsList>
            </FormFieldContainer>

            <FormFieldContainer items="center" justify="center">
              <label htmlFor="published">published</label>

              <Field type="checkbox" name="published" id="published" />
            </FormFieldContainer>

            <FormFieldContainer>
              <p>
                <strong>Slug:</strong> {encodeURI(_.kebabCase(values.title))}
              </p>
            </FormFieldContainer>

            <button type="submit">create new post</button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        );
      }}
    </Formik>
  );
};
export default CreatePostForm;
