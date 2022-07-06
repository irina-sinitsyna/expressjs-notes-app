import { Router } from 'express';

import API from '../constants/routes.js';
import getGreetings from '../controllers/greetings/getGreetings.js';

const greetingsRouter = new Router();

greetingsRouter.get(API.greetings, getGreetings);

export default greetingsRouter;
