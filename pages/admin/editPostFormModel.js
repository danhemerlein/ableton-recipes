const model = {
  formId: 'editPostForm',
  formField: {
    style: {
      name: 'style',
      label: 'select a style',
      errorMessage: 'style is required',
    },

    starRating: {
      name: 'starRating',
      label: 'rating',
      errorMessage: 'star rating is required',
    },

    fit: {
      name: 'fit',
      label: 'how did it fit',
      errorMessage: 'fit is required',
    },

    wornOn: {
      name: 'wornOn',
      label: 'select all that apply',
      errorMessage: 'management is required',
    },

    reviewTitle: {
      name: 'reviewTitle',
      label: 'enter review title *',
      errorMessage: 'review title is required',
    },

    reviewContent: {
      name: 'reviewContent',
      label: 'write your review *',
      errorMessage: 'review content is required',
    },

    heightFeet: {
      name: 'heightFeet',
      label: 'height (ft)',
      errorMessage: 'please enter a vaild height in feet',
    },

    heightInches: {
      name: 'heightInches',
      label: 'height (in)',
      errorMessage: 'please enter a valid height in inches',
    },

    weight: {
      name: 'weight',
      label: 'weight (lbs)',
      errorMessage: 'please enter a valid weight',
    },

    pantSize: {
      name: 'pantSize',
      label: 'pants size',
      errorMessage: 'please enter a valid pants size',
    },

    sizePurchased: {
      name: 'sizePurchased',
      label: 'select a size *',
      errorMessage: 'please enter a valid size purchased',
    },

    management: {
      name: 'management',
      label: 'select all that apply',
      errorMessage: 'management is required',
    },

    thinxUser: {
      name: 'thinxUser',
      label: '',
      errorMessage: 'please enter a valid value',
    },

    userName: {
      name: 'userName',
      label: 'name *',
      errorMessage: 'please enter a valid first name, this field is required',
    },

    age: {
      name: 'age',
      label: 'age',
      errorMessage: 'please enter a valid age',
    },

    email: {
      name: 'email',
      label: 'email *',
      errorMessage: 'please enter a valid emai, this field is required',
    },
  },
};

export default model;
