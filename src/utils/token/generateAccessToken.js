import jwt from 'jsonwebtoken';

import { TOKEN_LIFE_IN_SECONDS } from '../../constants/config.js';

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: TOKEN_LIFE_IN_SECONDS });
};

export default generateAccessToken;
