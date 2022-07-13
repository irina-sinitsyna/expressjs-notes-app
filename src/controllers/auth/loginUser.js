import bcrypt from 'bcryptjs';

import User from '../../models/User.js';
import STATUS from '../../constants/statuses.js';
import MESSAGE from '../../constants/messages.js';
import { VALIDATION_ERROR_TYPE } from '../../constants/validation.js';
import { validateAuth } from '../../validation/auth/validateAuth.js';

const loginUser = async (request, response) => {
  const { error } = validateAuth(request.body);
  if (error) {
    return response.status(STATUS.badRequest).json({
      type: VALIDATION_ERROR_TYPE,
      message: MESSAGE.validationError,
      details: error.details,
    });
  }
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(STATUS.badRequest).json(MESSAGE.nonexistentEmail);
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return response.status(STATUS.badRequest).json(MESSAGE.incorrectPassword);
    }
    return response.status(STATUS.ok).json(MESSAGE.loginSuccess);
  } catch (error) {
    response.status(STATUS.serverError).json(error);
  }
};

export default loginUser;
