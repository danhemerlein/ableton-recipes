import Button from '@components/Button';
import CheckboxList from '@components/CheckboxList';
import TextField from '@components/TextField';
import {
  deleteDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from '@firebase/firestore';
import { Field, Form, Formik } from 'formik';
import { remHelper } from 'lib/utilities/remHelper';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { CenterContainer, FlexContainer } from 'styles/elements/containers';
import { H1, P } from 'styles/elements/typography';
import { successToastStyles } from 'styles/utilities';
import { formId } from './updatePostFormModel';
import schema from './validationSchema';

const StyledForm = styled(Form)`
  width: 100%;
`;

const FormFieldContainer = styled(FlexContainer)`
  margin: ${remHelper[16]} 0;
`;

const TextInputLabel = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const AuthorLabel = styled(P)`
  margin-right: ${remHelper[8]};
`;

const StyledButton = styled(Button)`
  margin: ${remHelper[8]} 0;
`;

const UpdatePostForm = ({
  defaultValues,
  postRef,
  tags,
  authors,
  plugins,
  genres,
}) => {
  const [slugIsValid, setSlugIsValid] = useState(true);
  const [slugLoading, setSlugLoading] = useState(false);

  const [linkIsValid, setLinkIsValid] = useState(true);
  const [linkLoading, setLinkLoading] = useState(false);

  // Hit the database for slug match after each debounced change
  // useCallback is required for debounce to work

  const checkSlug = useCallback(
    _.debounce(async (title) => {
      setSlugLoading(true);

      const collectionGroupQuery = query(
        collectionGroup(firestore, 'posts'),
        where('slug', '==', encodeURI(_.kebabCase(title)))
      );

      const querySnapshot = await getDocs(collectionGroupQuery);

      const posts = querySnapshot.docs.map(docToJSON);

      if (posts.length) {
        setSlugIsValid(false);
      } else {
        setSlugIsValid(true);
      }
      setSlugLoading(false);
    }, 250),
    []
  );

  const checkLink = useCallback(
    _.debounce(async (link) => {
      setLinkLoading(true);

      const collectionGroupQuery = query(
        collectionGroup(firestore, 'posts'),
        where('link', '==', link)
      );

      const querySnapshot = await getDocs(collectionGroupQuery);

      const posts = querySnapshot.docs.map(docToJSON);

      if (posts.length) {
        setLinkIsValid(false);
      } else {
        setLinkIsValid(true);
      }
      setLinkLoading(false);
    }, 250),
    []
  );

  const updatePost = async (updatedPost) => {
    const data = {
      title: updatedPost.title,
      published: updatedPost.published,
      ...updatedPost,
      createdAt: Timestamp.fromMillis(defaultValues[0].createdAt),
      updatedAt: serverTimestamp(),
    };

    if (slugIsValid && linkIsValid) {
      await updateDoc(postRef, data);
      toast('post updated successfully!', successToastStyles);
    } else {
      toast(
        'a post with that title, slug or link already exist - please edit the title or link',
        errorToastStyles
      );
    }
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
      <Formik
        initialValues={defaultValues[0]}
        validationSchema={schema[0]}
        onSubmit={(values, { setSubmitting }) => {
          updatePost(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldTouched,
          setFieldValue,
        }) => {
          const setTitleValue = (titleString) => {
            setFieldTouched('title', true, false);
            checkSlug(titleString);

            return setFieldValue('title', titleString);
          };

          const setLinkValue = (linkString) => {
            setFieldTouched('link', true, false);
            checkLink(linkString);

            return setFieldValue('link', linkString);
          };

          const titleChangeHandler = (e) => {
            e.preventDefault();
            setTitleValue(e.target.value);
          };

          const linkChangeHandler = (e) => {
            e.preventDefault();
            setLinkValue(e.target.value);
          };

          return (
            <StyledForm id={formId}>
              <H1 textAlign="center">update post</H1>
              <FormFieldContainer direction="column">
                <TextInputLabel as="label" htmlFor="title">
                  title
                </TextInputLabel>

                <TextField
                  type="text"
                  name="title"
                  id="title"
                  value={values.title}
                  changeHandler={titleChangeHandler}
                />
              </FormFieldContainer>

              <FormFieldContainer direction="column">
                <TextInputLabel as="label" htmlFor="link">
                  link
                </TextInputLabel>

                <TextField
                  type="text"
                  name="link"
                  value={values.link}
                  changeHandler={linkChangeHandler}
                ></TextField>
              </FormFieldContainer>

              <FormFieldContainer direction="column">
                <TextInputLabel as="label" htmlFor="link">
                  link
                </TextInputLabel>

                <TextField
                  type="text"
                  name="link"
                  value={values.link}
                  changeHandler={linkChangeHandler}
                ></TextField>
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

              <CheckboxList fieldValues={tags} fieldName="tags" />
              <CheckboxList fieldValues={genres} fieldName="genres" />
              <CheckboxList fieldValues={plugins} fieldName="plugins" />

              <FormFieldContainer items="center" items="center">
                <P as="label" htmlFor="published">
                  published
                </P>

                <Field type="checkbox" name="published" id="published" />
              </FormFieldContainer>

              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

              <StyledButton mode="primary" type="submit" CTA="submit edits" />
            </StyledForm>
          );
        }}
      </Formik>

      <StyledButton
        mode="primary"
        type="submit"
        CTA="delete post"
        clickHandler={deletePost}
      />
    </CenterContainer>
  );
};

export default UpdatePostForm;
