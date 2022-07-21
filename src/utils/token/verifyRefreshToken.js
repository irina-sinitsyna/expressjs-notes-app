import jsonwebtoken from 'jsonwebtoken';

const verifyRefreshToken = (refreshToken) => {
  const handlePromise = (resolve, reject) => {
    const verifyCallback = (error, payload) => {
      if (error) {
        reject(error);
      }

      resolve(payload.id);
    };
    jsonwebtoken.verify(refreshToken, process.env.REFRESH_KEY, verifyCallback);
  };
  return new Promise(handlePromise);
};

export default verifyRefreshToken;
