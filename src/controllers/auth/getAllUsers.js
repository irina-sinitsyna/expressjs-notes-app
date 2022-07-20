import { STATUS } from '../../constants/statuses.js';
import User from '../../models/User/User.js';

const getAllUsers = async (request, response) => {
  try {
    const users = await User.find().select(['-__v']).select(['-password']);
    response.json(users);
  } catch (error) {
    response.status(STATUS.serverError).json(error);
  }
};

export default getAllUsers;
