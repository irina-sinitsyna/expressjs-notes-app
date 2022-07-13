import Note from '../../models/Note.js';
import MESSAGE from '../../constants/messages.js';
import STATUS from '../../constants/statuses.js';
import { VALIDATION_ERROR_TYPE } from '../../constants/validation.js';
import { validateUpdatedNote } from '../../validation/notes/validateUpdatedNote.js';
import { CURRENT_DATE_ISO } from '../../constants/config.js';

const updateNote = async (request, response) => {
  const { error, value } = validateUpdatedNote(request.body);
  if (error)
    return response.status(STATUS.badRequest).json({
      type: VALIDATION_ERROR_TYPE,
      message: MESSAGE.validationError,
      details: error.details,
    });
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      value._id,
      { updatedAt: CURRENT_DATE_ISO, ...value },
      { new: true },
    );
    return response.json(updatedNote);
  } catch (error) {
    response.status(STATUS.serverError).json(error);
  }
};

export default updateNote;
