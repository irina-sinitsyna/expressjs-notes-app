import Note from '../../schemas/Note.js';
import MESSAGE from '../../constants/messages.js';
import STATUS from '../../constants/statuses.js';

const updateNote = async (request, response) => {
  try {
    const note = request.body;
    if (!note._id) {
      response.status(STATUS.BAD_REQUEST).json(MESSAGE.noId);
    }
    const updatedNote = await Note.findByIdAndUpdate(note._id, note, { new: true });
    return response.json(updatedNote);
  } catch (error) {
    response.status(STATUS.SERVER_ERROR).json(error);
  }
};

export default updateNote;
