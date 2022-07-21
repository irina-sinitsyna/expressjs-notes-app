import Joi from 'joi';

import { MIN_NOTE_LENGTH, MAX_NOTE_LENGTH } from '../../../constants/validation.js';

const createNoteValidationSchema = Joi.object().keys({
  _id: Joi.string(),
  title: Joi.string().min(MIN_NOTE_LENGTH).required(),
  content: Joi.string().min(MIN_NOTE_LENGTH).max(MAX_NOTE_LENGTH).required(),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
});

export default createNoteValidationSchema;
