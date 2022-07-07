import Joi from 'joi';

import { MIN_LENGTH, MAX_LENGTH } from '../../constants/validation.js';

const createNoteValidationSchema = Joi.object().keys({
  _id: Joi.string(),
  title: Joi.string().min(MIN_LENGTH).required(),
  content: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH).required(),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
});

export default createNoteValidationSchema;
