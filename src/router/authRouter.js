import { Router } from 'express';

import API from '../constants/routes.js';
import AuthController from '../controllers/auth/index.js';

const authRouter = new Router();

authRouter.post(API.registration, AuthController.register);
authRouter.post(API.login, AuthController.login);

export default authRouter;
