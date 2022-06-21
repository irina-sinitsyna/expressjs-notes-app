import Note from '../../schemas/Note.js';
import STATUS from '../../constants/statuses.js';

const getAllNotes = async (request, response) => {
  try {
    const notes = await Note.find();
    return response.json(notes);
  } catch (error) {
    response.status(STATUS.SERVER_ERROR).json(error);
  }
};

export default getAllNotes;
