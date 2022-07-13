import Note from '../../models/Note.js';
import STATUS from '../../constants/statuses.js';
import { INITIAL_NOTES_PAGE, NOTES_LIMIT_PER_PAGE } from '../../constants/config.js';

const getAllNotes = async (request, response, next) => {
  const { page = INITIAL_NOTES_PAGE, title, createdAt } = request.query;
  let notes;
  if (title && createdAt) {
    notes = await Note.find({ title: title, createdAt: createdAt })
      .limit(NOTES_LIMIT_PER_PAGE)
      .skip((page - INITIAL_NOTES_PAGE) * NOTES_LIMIT_PER_PAGE)
      .catch((error) => {
        return response.status(STATUS.serverError).json(error);
      });
    return notes;
  } else if (title) {
    notes = Note.find({ title: title })
      .limit(NOTES_LIMIT_PER_PAGE)
      .skip((page - INITIAL_NOTES_PAGE) * NOTES_LIMIT_PER_PAGE)
      .catch((error) => {
        return response.status(STATUS.serverError).json(error);
      });
    return notes;
  } else if (createdAt) {
    notes = Note.find({ createdAt: createdAt })
      .limit(NOTES_LIMIT_PER_PAGE)
      .skip((page - INITIAL_NOTES_PAGE) * NOTES_LIMIT_PER_PAGE)
      .catch((error) => {
        return response.status(STATUS.serverError).json(error);
      });
    return notes;
  } else {
    notes = Note.find()
      .limit(NOTES_LIMIT_PER_PAGE)
      .skip((page - INITIAL_NOTES_PAGE) * NOTES_LIMIT_PER_PAGE)
      .catch((error) => {
        return response.status(STATUS.serverError).json(error);
      });
    return notes;
  }
};

export default getAllNotes;
