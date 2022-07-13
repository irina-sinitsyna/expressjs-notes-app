import Joi from 'joi';

import { MIN_NOTE_LENGTH, MAX_NOTE_LENGTH } from '../../../constants/validation.js';

const updateNoteValidationSchema = Joi.object().keys({
  _id: Joi.string().required(),
  title: Joi.string().min(MIN_NOTE_LENGTH).required(),
  content: Joi.string().min(MIN_NOTE_LENGTH).max(MAX_NOTE_LENGTH).required(),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
});

export default updateNoteValidationSchema;
