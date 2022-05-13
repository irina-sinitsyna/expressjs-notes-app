import express from 'express';
import dotenv from 'dotenv';

import STATUS from './src/constants.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());

app.get('/api/greetings', (request, response) => {
  const { name } = request.query;
  if (name) {
    response.send(`<p>Hello ${name}!</p>`);
  } else {
    response.status(STATUS.BAD_REQUEST).json({ error: 'Name undefined' });
  }
});

app.listen(port, () => console.log('SERVER STARTED ON PORT ' + port));
