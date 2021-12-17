import * as yup from 'yup';
import createPostFormModel from './createPostFormModel';

const {
  formField: { title, link, author, tags, genres, plugins, published },
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

    [tags.name]: yup
      .array()
      .of(yup.string().min(1))
      .required(`${tags.errorMessage}`),

    [genres.name]: yup.array().of(yup.string().min(1)),
    [plugins.name]: yup.array().of(yup.string().min(1)),

    [published.name]: yup.bool(),
  }),
];

export default schema;
