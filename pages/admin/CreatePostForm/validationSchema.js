import * as yup from 'yup';
import createPostFormModel from './createPostFormModel';

const {
  formField: { title, link, author, authorLink, tags, published },
} = createPostFormModel;

const schema = [
  yup.object().shape({
    [title.name]: yup.string().max(80).min(3).required(`${title.errorMessage}`),

    [link.name]: yup.string().required(`${link.errorMessage}`),
    [author.name]: yup
      .string()
      .max(80)
      .min(3)
      .required(`${author.errorMessage}`),
    [authorLink.name]: yup
      .string()
      .max(80)
      .min(3)
      .required(`${authorLink.errorMessage}`),
    [tags.name]: yup
      .array()
      .of(yup.string().min(1))
      .required(`${tags.errorMessage}`),
    [published.name]: yup.bool(),
  }),
];

export default schema;
