import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
  query,
  collectionGroup,
  where,
} from '@firebase/firestore';
import { above, errorToastStyles } from 'styles/utilities';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { UserContext } from 'lib/context';
import { auth, firestore, docToJSON } from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import _ from 'lodash';
import { successToastStyles } from 'styles/utilities';

import { useRouter } from 'next/dist/client/router';
import { useCallback, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { CenterContainer, FlexContainer } from 'styles/elements/containers';
import { P } from 'styles/elements/typography';
import { formId } from './createPostFormModel';
import defaultValues from './defaultValues';
import schema from './validationSchema';

const FormFieldContainer = styled(FlexContainer)`
  margin: ${remHelper[16]} 0;
`;

const TagsList = styled.ul`
  margin: 0 0 ${remHelper[8]} 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const TagLitItem = styled.li`
  border: ${({ theme }) => theme.border};

  padding: ${remHelper[8]};
  border-radius: 25%;
  display: inline;
  margin: 0 ${remHelper[8]};
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

const StyledForm = styled(Form)`
  width: 100%;
`;

const CreatePostForm = ({ tags, authors }) => {
  const { username } = useContext(UserContext);
  const router = useRouter();

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

  // Create a new post in firestore
  const createPost = async (formValues) => {
    const uid = auth.currentUser.uid;

    // ensure slug is URL safe
    const slug = encodeURI(_.kebabCase(formValues.title));

    // Tip: give all fields a default value here
    const data = {
      username,
      userID: uid,
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

    if (slugIsValid && linkIsValid) {
      const newPost = await addDoc(collection(firestore, 'posts'), data);
      const fileID = newPost.id;
      const postDocID = await updateDoc(doc(firestore, 'posts', fileID), {
        id: fileID,
      });
      toast('post created', successToastStyles);
    } else {
      toast(
        'a post with that title, slug or link already exist - please edit the title or link',
        errorToastStyles
      );
    }
  };

  return (
    <CenterContainer>
      <Formik
        initialValues={defaultValues}
        validationSchema={schema[0]}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          createPost(values);
          setSubmitting(false);

          resetForm({ values: { ...defaultValues } });

          // Imperative navigation after doc is set
          router.push(`/admin/${slug}`);
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
            console.log('running set link value');
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
              <FormFieldContainer direction="column">
                <TextInputLabel as="label" htmlFor="title">
                  title
                </TextInputLabel>

                <Field
                  type="text"
                  name="title"
                  id="title"
                  value={values.title}
                  onChange={titleChangeHandler}
                />

                <ErrorMessage name="title" />
              </FormFieldContainer>

              <FormFieldContainer>
                <P>
                  Slug:{' '}
                  {slugLoading
                    ? 'loading...'
                    : encodeURI(_.kebabCase(values.title))}
                </P>
              </FormFieldContainer>

              <FormFieldContainer direction="column">
                <TextInputLabel as="label" htmlFor="link">
                  link
                </TextInputLabel>
                <Field
                  type="text"
                  name="link"
                  value={values.link}
                  onChange={linkChangeHandler}
                ></Field>
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

              <StyledButton type="submit">create new post</StyledButton>

              <StyledPre>{JSON.stringify(values, null, 2)}</StyledPre>
            </StyledForm>
          );
        }}
      </Formik>
    </CenterContainer>
  );
};
export default CreatePostForm;
