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
import { FlexContainer, CenterContainer } from 'styles/elements/containers';
import { P } from 'styles/elements/typography';
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

const TextInputLabel = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const AuthorLabel = styled(P)`
  margin-right: ${remHelper[8]};
`;

const StyledButton = styled.button`
  margin: ${remHelper[8]} 0;
`;

const StyledPre = styled.pre`
  font-size: 1.6rem;
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
      author: formValues.author,
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
    <CenterContainer>
      <Formik
        initialValues={defaultValues}
        validationSchema={schema[0]}
        onSubmit={(values, { setSubmitting }) => {
          createPost(values);
          setSubmitting(false);

          resetForm();
          // Imperative navigation after doc is set
          router.push(`/admin/${slug}`);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => {
          console.log(values);
          return (
            <Form id={formId}>
              <FormFieldContainer direction="column">
                <TextInputLabel as="label" htmlFor="title">
                  title
                </TextInputLabel>
                <Field type="text" name="title" id="title" />

                <ErrorMessage name="title" />
              </FormFieldContainer>

              <FormFieldContainer direction="column">
                <TextInputLabel as="label" htmlFor="link">
                  link
                </TextInputLabel>
                <Field type="text" name="link"></Field>
                <ErrorMessage name="link" />
              </FormFieldContainer>

              <AuthorLabel as="label" htmlFor="author">
                author:
              </AuthorLabel>

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
                <FlexContainer items="center">
                  <P>tags:</P>
                  <TagsList>
                    {tags.map((tag) => {
                      return (
                        <TagLitItem key={tag.id}>
                          <P as="label" htmlFor={tag.id}>
                            {tag.id}
                          </P>
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
                </FlexContainer>
              </FormFieldContainer>

              <FormFieldContainer items="center" items="center">
                <P as="label" htmlFor="published">
                  published
                </P>

                <Field type="checkbox" name="published" id="published" />
              </FormFieldContainer>

              <FormFieldContainer>
                <P>
                  <strong>Slug:</strong> {encodeURI(_.kebabCase(values.title))}
                </P>
              </FormFieldContainer>

              <StyledButton type="submit">create new post</StyledButton>

              <StyledPre>{JSON.stringify(values, null, 2)}</StyledPre>
            </Form>
          );
        }}
      </Formik>
    </CenterContainer>
  );
};
export default CreatePostForm;
