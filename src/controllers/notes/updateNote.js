import Note from '../../schemas/Note.js';
import MESSAGE from '../../constants/messages.js';
import STATUS from '../../constants/statuses.js';
import { VALIDATION_ERROR_TYPE } from '../../constants/validation.js';
import { validateUpdatedNote } from '../../../validation/validateUpdatedNote.js';

const updateNote = async (request, response) => {
  const { error, value } = validateUpdatedNote(request.body);
  if (error)
    return response.status(STATUS.BAD_REQUEST).json({
      type: VALIDATION_ERROR_TYPE,
      message: MESSAGE.validationError,
      details: error.details,
    });
  const updatedNote = await Note.findByIdAndUpdate(value._id, value, { new: true });
  return response.json(updatedNote);
};

export default updateNote;
