import Joi from 'joi';

import {
  MIN_EMAIL_LENGTH,
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../../constants/validation.js';

const authValidationSchema = Joi.object().keys({
  email: Joi.string().min(MIN_EMAIL_LENGTH).max(MAX_EMAIL_LENGTH).required(),
  password: Joi.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH).required(),
});

export default authValidationSchema;
