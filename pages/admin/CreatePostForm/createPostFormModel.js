const model = {
  formId: 'createPostForm',
  formField: {
    title: {
      name: 'title',
      label: 'enter title',
      errorMessage: 'title is required',
    },

    link: {
      name: 'link',
      label: 'enter link',
      errorMessage: 'link is required',
    },

    author: {
      name: 'author',
      label: 'enter author',
      errorMessage: 'author is required',
    },

    authorLink: {
      name: 'authorLink',
      label: 'enter author link',
      errorMessage: 'author link is required',
    },

    tags: {
      name: 'tags',
      label: 'tags',
    },

    published: {
      name: 'published',
      label: 'publish now?',
    },
  },
};

export default model;
