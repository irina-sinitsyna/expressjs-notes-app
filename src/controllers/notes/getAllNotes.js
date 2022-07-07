import Note from '../../schemas/Note.js';
import STATUS from '../../constants/statuses.js';
import { INITIAL_NOTES_PAGE, NOTES_LIMIT_PER_PAGE } from '../../constants/config.js';

const getPaginatedNotes = async (request, response, next) => {
  const { page = INITIAL_NOTES_PAGE } = request.query;
  try {
    const paginatedNotes = await Note.find()
      .limit(NOTES_LIMIT_PER_PAGE)
      .skip((page - INITIAL_NOTES_PAGE) * NOTES_LIMIT_PER_PAGE);
    return response.json(paginatedNotes);
  } catch (error) {
    return response.status(STATUS.SERVER_ERROR).json(error);
  }
};

export default getPaginatedNotes;
