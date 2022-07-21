import Note from '../../models/Note.js';
import { MESSAGE } from '../../constants/messages.js';
import { STATUS } from '../../constants/statuses.js';
import { ERROR_TYPE } from '../../constants/errorTypes.js';

const getNote = async (request, response, next) => {
  const userId = request.user._id;
  if (!userId) {
    response.status(STATUS.unauthorized).json({
      type: ERROR_TYPE.authorizationError,
      message: MESSAGE.authorizationError,
    });
    return;
  }
  try {
    const { id: noteId } = request.params;
    if (!noteId) {
      return response.status(STATUS.badRequest).json(MESSAGE.noId);
    }
    const note = await Note.findById(noteId);
    return response.json(note);
  } catch (error) {
    response.status(STATUS.serverError).json({ error });
    return;
  }
};

export default getNote;
