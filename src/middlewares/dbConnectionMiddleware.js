import connectToDatabase from '../utils/db/connectToDatabase.js';

const dbConnectionMiddleware = async (request, response, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    next(error);
  }
};

export default dbConnectionMiddleware;
