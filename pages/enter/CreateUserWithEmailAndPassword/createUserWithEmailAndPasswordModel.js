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

    passwordReentry: {
      name: 'passwordReentry',
      label: 're-enter password',
      errorMessage: "passwords don't match",
    },
  },
};

export default model;
