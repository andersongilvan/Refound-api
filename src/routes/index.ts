import { Router } from 'express';
import { ensureAuth } from '@/middlewares/ensureAuth';
import { refoundRoutes } from './refoundRouter';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use('/user', userRoutes);

// rotas privadas
routes.use('/refound', ensureAuth, refoundRoutes);

export { routes };
