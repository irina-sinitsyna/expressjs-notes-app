import Note from '../../models/Note.js';
import { STATUS } from '../../constants/statuses.js';
import { INITIAL_NOTES_PAGE, NOTES_LIMIT_PER_PAGE } from '../../constants/config.js';
import filterNotes from '../../utils/notes/filterNotes.js';
import { MESSAGE } from '../../constants/messages.js';

const getAllNotes = async (request, response, next) => {
  if (!request.user._id) {
    response.status(STATUS.unauthorized).json({
      type: ERROR_TYPE.authorizationError,
      message: MESSAGE.authorizationError,
    });
    return;
  }
  let query = {
    user: request.user._id,
  };
  const { title, date, page = INITIAL_NOTES_PAGE } = request.query;
  query = filterNotes(title, date, query);
  try {
    const notes = await Note.find(query)
      .limit(NOTES_LIMIT_PER_PAGE)
      .skip((page - INITIAL_NOTES_PAGE) * NOTES_LIMIT_PER_PAGE);
    return response.json(notes);
  } catch (error) {
    response.status(STATUS.serverError).json({ error });
    return;
  }
};

export default getAllNotes;
