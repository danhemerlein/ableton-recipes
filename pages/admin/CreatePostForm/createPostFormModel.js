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

    tags: {
      name: 'tags',
      label: 'tags',
    },

    genres: {
      name: 'genres',
      label: 'genres',
    },

    plugins: {
      name: 'plugins',
      label: 'plugins',
    },

    published: {
      name: 'published',
      label: 'publish now?',
    },
  },
};

export default model;
