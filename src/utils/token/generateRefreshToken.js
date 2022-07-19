import jwt from 'jsonwebtoken';

import { REFRESH_TOKEN_LIFE_IN_SECONDS } from '../../constants/config.js';

const generateRefreshToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: REFRESH_TOKEN_LIFE_IN_SECONDS });
};

export default generateRefreshToken;
