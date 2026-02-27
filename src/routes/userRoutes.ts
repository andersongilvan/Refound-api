import { Router } from 'express';
import { authUserCpntroller } from '@/modules/user/controllers/factory/authUserController';
import { createUserController } from '@/modules/user/controllers/factory/createUserController';

const userRoutes = Router();

userRoutes.post('/', createUserController.handler);
userRoutes.post('/session', authUserCpntroller.handler);

export { userRoutes };
