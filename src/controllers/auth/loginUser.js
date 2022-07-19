import bcrypt from 'bcryptjs';

import User from '../../models/User/User.js';
import STATUS from '../../constants/statuses.js';
import MESSAGE from '../../constants/messages.js';
import generateAccessToken from '../../utils/token/generateAccessToken.js';
import generateRefreshToken from '../../utils/token/generateRefreshToken.js';
import { ERROR_TYPE } from '../../constants/errorTypes.js';
import { validateAuth } from '../../validation/auth/validateAuth.js';

const loginUser = async (request, response, next) => {
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
    const user = await User.findOne({ email });
    if (!user) {
      response.status(STATUS.badRequest).json({
        type: ERROR_TYPE.nonexistentUser,
        message: MESSAGE.nonexistentEmail,
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      response.status(STATUS.badRequest).json({
        type: ERROR_TYPE.incorrectPassword,
        message: MESSAGE.incorrectPassword,
      });
      return;
    }
    const token = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    response.json({
      message: MESSAGE.loginSuccess,
      token: token,
      refreshToken: refreshToken,
    });
    return;
  } catch (error) {
    response.status(STATUS.serverError).json({ error });
    return;
  }
};

export default loginUser;
