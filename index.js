import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import MESSAGE from './src/constants/messages.js';
import API from './src/constants/routes.js';
import { ADDITIONAL_PORT } from './src/constants/config.js';
import noteRouter from './src/router/noteRouter.js';
import greetingsRouter from './src/router/greetingsRouter.js';
import authRouter from './src/router/authRouter.js';

dotenv.config();

const app = express();

const port = process.env.PORT || ADDITIONAL_PORT;

app.use(express.json());
app.use(API.base, noteRouter);
app.use(API.base, greetingsRouter);
app.use(API.base, authRouter);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(port, () => console.log(MESSAGE.serverStarted + port));
  } catch (error) {
    console.log(error);
  }
};

startApp();
