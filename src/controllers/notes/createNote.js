import Note from '../../models/Note.js';
import STATUS from '../../constants/statuses.js';
import { validateNewNote } from '../../validation/notes/validateNewNote.js';
import MESSAGE from '../../constants/messages.js';
import { CURRENT_DATE_ISO } from '../../constants/config.js';
import { ERROR_TYPE } from '../../constants/errorTypes.js';

const createNote = async (request, response, next) => {
  if (!request.user._id) {
    response.status(STATUS.unauthorized).json({
      type: ERROR_TYPE.authorizationError,
      message: MESSAGE.authorizationError,
    });
    return;
  }
  const { error: validationError, value } = validateNewNote(request.body);
  if (validationError) {
    return response.status(STATUS.badRequest).json({
      type: ERROR_TYPE.validation,
      message: MESSAGE.validationError,
      details: validationError.details,
    });
  }
  try {
    let { title } = value;
    if (process.env.NOTE_POSTFIX) {
      title = title + ' ' + process.env.NOTE_POSTFIX;
    }
    const note = await Note.create({
      title: title,
      content: value.content,
      createdAt: CURRENT_DATE_ISO,
      user: request.user._id,
    });
    return response.json(note);
  } catch (error) {
    response.status(STATUS.serverError).json({ error });
    return;
  }
};

export default createNote;
