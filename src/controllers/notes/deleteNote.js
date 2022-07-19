import Note from '../../models/Note.js';
import MESSAGE from '../../constants/messages.js';
import STATUS from '../../constants/statuses.js';
import { ERROR_TYPE } from '../../constants/errorTypes.js';

const deleteNote = async (request, response, next) => {
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
    const note = await Note.deleteOne({ id: noteId, user: userId });
    if (note.deletedCount) {
      return response.json({ success: true, id: noteId });
    }
    return response.status(STATUS.badRequest).json({ message: MESSAGE.nonexistentNote });
  } catch (error) {
    response.status(STATUS.serverError).json({ error });
    return;
  }
};

export default deleteNote;
