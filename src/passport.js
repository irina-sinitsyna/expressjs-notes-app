import dotenv from 'dotenv';

import { Strategy, ExtractJwt } from 'passport-jwt';
import User from './models/User/User.js';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

const configurePassportJWTStrategy = (passport) => {
  const findUser = (payload, done) => {
    const handleFindUser = (error, user) => {
      if (error) {
        done(error, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    };
    User.findById(payload.id, handleFindUser);
  };
  const jwtStrategy = new Strategy(options, findUser);
  passport.use(jwtStrategy);
};

export default configurePassportJWTStrategy;
