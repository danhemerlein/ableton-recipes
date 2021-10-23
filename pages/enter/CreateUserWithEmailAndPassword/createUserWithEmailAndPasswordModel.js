const model = {
  formId: 'createUserWithEmailAndPassword',
  formField: {
    email: {
      name: 'email',
      label: 'enter email',
      errorMessage: 'email is required',
    },

    password: {
      name: 'password',
      label: 'password',
      errorMessage: 'password is required',
    },
  },
};

export default model;
