import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';

import { MESSAGE } from './src/constants/messages.js';
import API from './src/constants/routes.js';
import { ADDITIONAL_PORT } from './src/constants/config.js';
import noteRouter from './src/router/noteRouter.js';
import greetingsRouter from './src/router/greetingsRouter.js';
import authRouter from './src/router/authRouter.js';
import configurePassportJWTStrategy from './src/passport.js';
import dbConnectionMiddleware from './src/middlewares/dbConnectionMiddleware.js';

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

const app = express();

const PORT = process.env.PORT || ADDITIONAL_PORT;

app.use(dbConnectionMiddleware);
app.use(express.json());

app.use(API.base, greetingsRouter);
app.use(API.base, authRouter);

configurePassportJWTStrategy(passport);
app.use(API.base, noteRouter);

app.listen(PORT, () => console.log(MESSAGE.serverStarted + PORT));
