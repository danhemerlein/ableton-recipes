import { Field, Form, Formik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { formId } from './editPostFormModel';

const PostTitle = styled(Field)`
  width: 100%;
  height: 200px;
`;

const PostContentTextArea = styled(Field)`
  width: 100%;
  height: 200px;
`;

const UpdatePostForm = ({ defaultValues, postRef, preview }) => {
  const updatePost = async ({ content, published }) => {
    // await postRef.update({
    //   content,
    //   published,
    //   updatedAt: serverTimestamp(),
    // });
    // reset({ content, published });
    toast.success('Post updated successfully!');
  };

  return (
    <>
      <h3>update post form</h3>

      {preview ? (
        <>
          <p>you are previewing this post, select edit to make changes</p>
          <div className="card">
            <ReactMarkdown>{defaultValues.title}</ReactMarkdown>
            <ReactMarkdown>{defaultValues.content}</ReactMarkdown>
          </div>
        </>
      ) : (
        <Formik
          initialValues={defaultValues}
          // validationSchema={currentValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, touched, isSubmitting }) => {
            console.log('Formik values', values);
            console.log('Formik errors', errors);
            console.log('Formik touched', touched);

            return (
              <Form id={formId}>
                <div style={'display: flex;'}>
                  <label htmlFor="title">edit title</label>
                  <PostTitle
                    type="text"
                    name="title"
                    id="title"
                    value={defaultValues.title}
                  />
                </div>

                <div style={'display: flex;'}>
                  <label htmlFor="content">edit content</label>
                  <PostContentTextArea name="content">
                    {defaultValues.content}
                  </PostContentTextArea>
                </div>

                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default UpdatePostForm;
