import bcrypt from 'bcryptjs';

import User from '../../models/User/User.js';
import STATUS from '../../constants/statuses.js';
import MESSAGE from '../../constants/messages.js';
import { validateAuth } from '../../validation/auth/validateAuth.js';
import { HASH_ARGUMENT } from '../../constants/config.js';
import generateAccessToken from '../../utils/token/generateAccessToken.js';
import generateRefreshToken from '../../utils/token/generateRefreshToken.js';
import { ERROR_TYPE } from '../../constants/errorTypes.js';

const registerUser = async (request, response, next) => {
  const { error, value } = validateAuth(request.body);
  if (error) {
    return response.status(STATUS.badRequest).json({
      type: ERROR_TYPE.validation,
      message: MESSAGE.validationError,
      details: error.details,
    });
  }
  try {
    const { email, password } = value;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      response.status(STATUS.badRequest).json({
        type: ERROR_TYPE.existingUser,
        message: MESSAGE.existingEmail,
      });
      return;
    }
    const encodedPassword = await bcrypt.hash(password, HASH_ARGUMENT);
    const user = new User({ email: email, password: encodedPassword });
    await user.save();
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    response.status(STATUS.ok).json({
      message: MESSAGE.registrationSuccess,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    response.status(STATUS.serverError).json({ error });
    return;
  }
};

export default registerUser;
