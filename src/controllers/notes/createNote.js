import Note from '../../schemas/Note.js';
import STATUS from '../../constants/statuses.js';

const createNote = async (request, response) => {
  try {
    const { title, content, createdAt, updatedAt } = request.body;
    const note = await Note.create({ title, content, createdAt, updatedAt });
    response.json(note);
  } catch (error) {
    response.status(STATUS.SERVER_ERROR).json(error);
  }
};

export default createNote;
