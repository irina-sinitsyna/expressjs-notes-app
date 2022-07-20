import { MESSAGE } from '../../constants/messages.js';
import { STATUS } from '../../constants/statuses.js';

const getGreetings = async (request, response) => {
  const { name } = request.query;
  if (name) {
    response.send(`<p>Hello ${name}!</p>`);
  }
  response.status(STATUS.badRequest).json({ error: MESSAGE.undefinedName });
};

export default getGreetings;
