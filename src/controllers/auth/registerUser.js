import bcrypt from 'bcryptjs';

import User from '../../models/User.js';
import STATUS from '../../constants/statuses.js';
import MESSAGE from '../../constants/messages.js';
import { VALIDATION_ERROR_TYPE } from '../../constants/validation.js';
import { validateAuth } from '../../validation/auth/validateAuth.js';
import { HASH_ARGUMENT } from '../../constants/config.js';

const registerUser = async (request, response) => {
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
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error(MESSAGE.existingEmail);
      error.status = STATUS.badRequest;
      return error;
    }
    const encodedPassword = await bcrypt.hash(password, HASH_ARGUMENT);
    const user = new User({ email: email, password: encodedPassword });
    await user.save();
    return response.status(STATUS.ok).json(MESSAGE.registrationSuccess);
  } catch (error) {
    return response.status(STATUS.serverError).json(error);
  }
};

export default registerUser;
