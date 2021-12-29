import * as yup from 'yup';
import updateUserSettingsFormModel from './updateUserSettingsFormModel';

const {
  formField: { pronouns, displayPronouns },
} = updateUserSettingsFormModel;

const schema = [
  yup.object().shape({
    [pronouns.name]: yup.string().max(80).min(2),

    [displayPronouns.name]: yup.bool(),
  }),
];

export default schema;
