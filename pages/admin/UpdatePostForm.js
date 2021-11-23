import {
  deleteDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from '@firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { formId } from './updatePostFormModel';
import schema from './validationSchema';

const PostTitle = styled(Field)`
  width: 100%;
`;

const PostContentTextArea = styled(Field)`
  width: 100%;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpdatePostForm = ({ defaultValues, postRef, preview }) => {
  console.log(defaultValues);
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

    toast.success('post updated successfully!');
  };

  const deletePost = async () => {
    if (window.confirm('confirm you want to delete this post')) {
      await deleteDoc(postRef);
    }
  };

  return (
    <>
      <h3>update post form</h3>

      {preview ? (
        <>
          <p>you are previewing this post, select edit to make changes</p>
          <div className="card">
            <ReactMarkdown>{defaultValues[0].title}</ReactMarkdown>
            <ReactMarkdown>{defaultValues[0].content}</ReactMarkdown>
          </div>
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
                <FlexContainer>
                  <label htmlFor="title">edit title</label>
                  <PostTitle
                    type="text"
                    name="title"
                    id="title"
                    value={values.title}
                  />
                  <ErrorMessage name="title" />
                </FlexContainer>

                <FlexContainer>
                  <label htmlFor="content">edit content</label>
                  <PostContentTextArea
                    type="textarea"
                    name="content"
                    name="content"
                    value={values.content}
                  ></PostContentTextArea>
                  <ErrorMessage name="content" />
                </FlexContainer>

                <FlexContainer>
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
                <button className="btn-green" type="submit">
                  submit edits
                </button>
              </Form>
            );
          }}
        </Formik>
      )}

      <button onClick={deletePost}>delete post</button>
    </>
  );
};

export default UpdatePostForm;
