import Joi from 'joi';

import { MIN_LENGTH, MAX_LENGTH } from '../../src/constants/validation.js';

const updateNoteValidationSchema = Joi.object().keys({
  _id: Joi.string().required(),
  title: Joi.string().min(MIN_LENGTH).required(),
  content: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string(),
});

export default updateNoteValidationSchema;
