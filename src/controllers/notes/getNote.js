import Note from '../../models/Note.js';
import MESSAGE from '../../constants/messages.js';
import STATUS from '../../constants/statuses.js';

const getNote = async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) {
      response.status(STATUS.badRequest).json(MESSAGE.noId);
    }
    const note = await Note.findById(id);
    return response.json(note);
  } catch (error) {
    response.status(STATUS.serverError).json(error);
  }
};

export default getNote;
