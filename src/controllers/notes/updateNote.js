import Note from '../../models/Note.js';
import { MESSAGE } from '../../constants/messages.js';
import { STATUS } from '../../constants/statuses.js';
import { validateUpdatedNote } from '../../validation/notes/validateUpdatedNote.js';
import { CURRENT_DATE_ISO } from '../../constants/config.js';
import { ERROR_TYPE } from '../../constants/errorTypes.js';

const updateNote = async (request, response, next) => {
  const userId = request.user._id;
  if (!userId) {
    response.status(STATUS.unauthorized).json({
      type: ERROR_TYPE.authorizationError,
      message: MESSAGE.authorizationError,
    });
    return;
  }
  const { error, value } = validateUpdatedNote(request.body);
  if (error) {
    return response.status(STATUS.badRequest).json({
      type: ERROR_TYPE.validation,
      message: MESSAGE.validationError,
      details: error.details,
    });
  }
  try {
    const updatedNote = await Note.updateOne(
      { id: value._id, user: userId },
      { updatedAt: CURRENT_DATE_ISO, ...value },
    );
    if (updatedNote.matchedCount) {
      response.json(updatedNote);
    } else {
      return response.status(STATUS.badRequest).json({ message: MESSAGE.nonexistentNote });
    }
  } catch (error) {
    response.status(STATUS.serverError).json({ error });
    return;
  }
};

export default updateNote;
