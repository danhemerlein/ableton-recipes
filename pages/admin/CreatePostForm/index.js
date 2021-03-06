import Button from '@components/Button';
import CheckboxList from '@components/CheckboxList';
import TextField from '@components/TextField';
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@firebase/firestore';
import { Field, Form, Formik } from 'formik';
import { UserContext } from 'lib/context';
import { docToJSON } from 'lib/firebase';
import { auth, firestore } from 'lib/firestore';
import { remHelper } from 'lib/utilities/remHelper';
import _ from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { CenterContainer, FlexContainer } from 'styles/elements/containers';
import { H1, P } from 'styles/elements/typography';
import { errorToastStyles, successToastStyles } from 'styles/utilities';
import { formId } from './createPostFormModel';
import defaultValues from './defaultValues';
import schema from './validationSchema';

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

const StyledForm = styled(Form)`
  width: 100%;
`;

const CreatePostForm = ({ tags, authors, plugins, genres }) => {
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
      genres: formValues.genres,
      plugins: formValues.plugins,
      tagsGenresPlugins: [
        ...formValues.tags,
        ...formValues.genres,
        ...formValues.plugins,
      ],
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
        {({ values, setFieldTouched, setFieldValue }) => {
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
              <H1 textAlign="center">create a new post</H1>
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
              <CheckboxList fieldValues={plugins} fieldName="plugins" />
              <CheckboxList fieldValues={genres} fieldName="genres" />

              <FormFieldContainer items="center" items="center">
                <P as="label" htmlFor="published">
                  published
                </P>

                <Field type="checkbox" name="published" id="published" />
              </FormFieldContainer>

              <StyledButton
                mode="primary"
                type="submit"
                CTA="create new post"
              />
            </StyledForm>
          );
        }}
      </Formik>
    </CenterContainer>
  );
};
export default CreatePostForm;
