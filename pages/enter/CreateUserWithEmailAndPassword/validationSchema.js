import * as yup from 'yup';
import createUserWithEmailAndPasswordModel from './createUserWithEmailAndPasswordModel';

const {
  formField: { email, password },
} = createUserWithEmailAndPasswordModel;

const schema = [
  yup.object().shape({
    [email.name]: yup.string().email().required(`${email.errorMessage}`),

    [password.name]: yup.string().required(`${password.errorMessage}`),
  }),
];

export default schema;
