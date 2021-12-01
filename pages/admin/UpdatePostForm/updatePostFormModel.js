const model = {
  formId: 'updatePostForm',
  formField: {
    title: {
      name: 'title',
      label: 'enter post title',
      errorMessage: 'post title is required',
    },

    content: {
      name: 'content',
      label: 'write your review',
      errorMessage: 'post content is required',
    },
  },
};

export default model;
