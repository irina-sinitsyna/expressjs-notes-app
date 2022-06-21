import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './src/router/index.js';
import MESSAGE from './src/constants/messages.js';
import API from './src/constants/routes.js';
import { ADDITIONAL_PORT } from './src/constants/config.js';

dotenv.config();

const app = express();

const port = process.env.PORT || ADDITIONAL_PORT;

app.use(express.json());
app.use(API.base, router);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(port, () => console.log(MESSAGE.serverStarted + port));
  } catch (error) {
    console.log(error);
  }
};

startApp();

app.get('/api/greetings', (request, response) => {
  const { name } = request.query;
  if (name) {
    response.send(`<p>Hello ${name}!</p>`);
  } else {
    response.status(STATUS.BAD_REQUEST).json({ error: 'Name undefined' });
  }
});
