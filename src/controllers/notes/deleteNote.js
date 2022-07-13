import Note from '../../models/Note.js';
import MESSAGE from '../../constants/messages.js';
import STATUS from '../../constants/statuses.js';

const deleteNote = async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) {
      response.status(STATUS.badRequest).json(MESSAGE.noId);
    }
    const note = await Note.findByIdAndDelete(id);
    return response.json({ success: true, id: id });
  } catch (error) {
    response.status(STATUS.serverError).json(error);
  }
};

export default deleteNote;
