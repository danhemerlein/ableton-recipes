import createPostFormModel from './createPostFormModel';
const {
  formField: { title, link, author, tags, genres, plugins, published },
} = createPostFormModel;

// the properties for initial values correspond to the name attribute of the fields
const values = {
  [title.name]: '',
  [link.name]: '',
  [author.name]: '',
  [tags.name]: [],
  [genres.name]: [],
  [plugins.name]: [],
  [published.name]: true,
};

export default values;
