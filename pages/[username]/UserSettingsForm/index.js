import { serverTimestamp, updateDoc } from '@firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { getUserWithUsername } from '../../../lib/firebase';
import { formId } from './updateUserSettingsFormModel';
import schema from './validationSchema';

const UserSettingsForm = ({ username }) => {
  const updateUser = async (updatedUser) => {
    const userRef = await getUserWithUsername(username);
    const data = {
      pronouns: updatedUser.pronouns,
      displayPronouns: updatedUser.displayPronouns,
      ...updatedUser,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(userRef, data);

    toast('user updated successfully!', successToastStyles);
  };

  return (
    <Formik
      initialValues={{ pronouns: '', displayPronouns: false }}
      validationSchema={schema[0]}
      onSubmit={(values, { setSubmitting }) => {
        updateUser(values);
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, isSubmitting }) => {
        return (
          <Form id={formId}>
            <label htmlFor="pronouns">edit pronouns</label>
            <Field
              type="text"
              name="pronouns"
              id="pronouns"
              value={values.pronouns}
            />
            <ErrorMessage name="pronouns" />

            <label htmlFor="displayPronouns">display pronouns publicaly</label>
            <Field
              type="checkbox"
              name="displayPronouns"
              id="displayPronouns"
              value={values.displayPronouns}
            />
            <ErrorMessage name="pronouns" />

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <button className="btn-green" type="submit">
              submit edits
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default UserSettingsForm;
