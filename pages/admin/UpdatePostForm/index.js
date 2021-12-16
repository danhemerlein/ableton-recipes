import {
  deleteDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from '@firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { successToastStyles } from 'styles/utilities';
import React from 'react';
import toast from 'react-hot-toast';
import { remHelper } from 'lib/utilities/remHelper';
import { P, H2 } from 'styles/elements/typography';
import styled from 'styled-components';
import { formId } from './updatePostFormModel';
import schema from './validationSchema';
import { successToastStyles } from 'styles/utilities';
import { CenterContainer, FlexContainer } from 'styles/elements/containers';

const PostTitle = styled(Field)`
  width: 100%;
`;

const Headline = styled(H2)`
  margin-bottom: ${remHelper[8]};
`;

const StyledP = styled(P)`
  margin-bottom: ${remHelper[8]};
`;

const UpdatePostForm = ({ defaultValues, postRef, preview }) => {
  const updatePost = async (updatedPost) => {
    const data = {
      title: updatedPost.title,
      content: updatedPost.content,
      published: updatedPost.published,
      ...updatedPost,
      createdAt: Timestamp.fromMillis(defaultValues[0].createdAt),
      updatedAt: serverTimestamp(),
    };

    await updateDoc(postRef, data);

    toast('post updated successfully!', successToastStyles);
  };

  const router = useRouter();

  const deletePost = async () => {
    if (window.confirm('are you sure you want to delete this post?')) {
      await deleteDoc(postRef);

      toast('post deleted successfully', successToastStyles);

      router.push(`/admin`);
    }
  };

  return (
    <CenterContainer direction="column">
      <Headline as="h3">update post form</Headline>

      {preview ? (
        <>
          <StyledP>
            you are previewing this post, select edit to make changes
          </StyledP>
          <StyledP>{defaultValues[0].title}</StyledP>
        </>
      ) : (
        <Formik
          initialValues={defaultValues[0]}
          validationSchema={schema[0]}
          onSubmit={(values, { setSubmitting }) => {
            updatePost(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, isSubmitting }) => {
            return (
              <Form id={formId}>
                <FlexContainer direction="column">
                  <label htmlFor="title">edit title</label>
                  <PostTitle
                    type="text"
                    name="title"
                    id="title"
                    value={values.title}
                  />
                  <ErrorMessage name="title" />
                </FlexContainer>

                <FlexContainer direction="column">
                  <label htmlFor="published">published</label>

                  <Field
                    type="checkbox"
                    name="published"
                    id="published"
                    value={values.published}
                    checked={values.published}
                  />
                </FlexContainer>

                <pre>{JSON.stringify(values, null, 2)}</pre>
                <button type="submit">submit edits</button>
              </Form>
            );
          }}
        </Formik>
      )}

      <button onClick={deletePost}>delete post</button>
    </CenterContainer>
  );
};

export default UpdatePostForm;
