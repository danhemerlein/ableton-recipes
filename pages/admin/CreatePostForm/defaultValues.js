import createPostFormModel from './createPostFormModel';
const {
  formField: { title, link, author, tags, published },
} = createPostFormModel;

// the properties for initial values correspond to the name attribute of the fields
const values = {
  [title.name]: '',
  [link.name]: '',
  [author.name]: '',
  [tags.name]: [],
  [published.name]: false,
};

export default values;
