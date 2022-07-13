import Note from '../../models/Note.js';
import STATUS from '../../constants/statuses.js';
import { validateNewNote } from '../../validation/notes/validateNewNote.js';
import MESSAGE from '../../constants/messages.js';
import { VALIDATION_ERROR_TYPE } from '../../constants/validation.js';

const createNote = async (request, response) => {
  const { error, value } = validateNewNote(request.body);
  if (error)
    return response.status(STATUS.badRequest).json({
      type: VALIDATION_ERROR_TYPE,
      message: MESSAGE.validationError,
      details: error.details,
    });
  try {
    const note = await Note.create(value);
    return response.json(note);
  } catch (error) {
    response.status(STATUS.serverError).json(error);
  }
};

export default createNote;
