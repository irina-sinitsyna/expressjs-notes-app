import { Router } from 'express';

import API from '../constants/routes.js';
import AuthController from '../controllers/auth/index.js';

const authRouter = new Router();

authRouter.post(API.registration, AuthController.register);
authRouter.post(API.login, AuthController.login);
authRouter.post(API.refresh, AuthController.refresh);
authRouter.get(API.users, AuthController.getUsers);

export default authRouter;
