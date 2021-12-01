import * as yup from 'yup';
import updatePostFormModel from './updatePostFormModel';

const {
  formField: { title, content },
} = updatePostFormModel;

const schema = [
  yup.object().shape({
    [title.name]: yup.string().max(80).min(3).required(`${title.errorMessage}`),

    [content.name]: yup.string().required(`${content.errorMessage}`),
  }),
];

export default schema;
