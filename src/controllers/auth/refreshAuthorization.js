import { ERROR_TYPE } from '../../constants/errorTypes.js';
import { MESSAGE } from '../../constants/messages.js';
import { STATUS } from '../../constants/statuses.js';
import generateAccessToken from '../../utils/token/generateAccessToken.js';
import generateRefreshToken from '../../utils/token/generateRefreshToken.js';
import verifyRefreshToken from '../../utils/token/verifyRefreshToken.js';

const refreshAuthorization = async (request, response, next) => {
  try {
    const { refreshToken } = request.body;
    if (!refreshToken) {
      response.status(STATUS.badRequest).json({
        type: ERROR_TYPE.noRefresh,
        message: MESSAGE.noRefresh,
      });
      return;
    }

    const user = await verifyRefreshToken(refreshToken);
    const token = generateAccessToken(user);
    const refresh = generateRefreshToken(user);
    response.status(STATUS.ok).json({ token: token, refreshToken: refresh });
  } catch (error) {
    response.status(STATUS.serverError).json({ error });
  }
};

export default refreshAuthorization;
