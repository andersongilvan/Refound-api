import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@/configs/upload';
import { verifyUser } from '@/middlewares/verify-user-authorization';
import { createRefoundController } from '@/modules/refound/controller/factory/create-refaound-controller';
import { deleteRefoundController } from '@/modules/refound/controller/factory/delete-refound-controller';
import { indexController } from '@/modules/refound/controller/factory/index-factory';
import { showDetailsRefoundController } from '@/modules/refound/controller/factory/show-details-refounds-controller';
import { showRefoundsByUserController } from '@/modules/refound/controller/factory/show-redounds-by-user-controller';

const refoundRoutes = Router();

const upload = multer(uploadConfig.MULTER);

// rotas privadas role employee
refoundRoutes.post('/', verifyUser(['employee']), upload.single('file'), createRefoundController.handler);

refoundRoutes.get('/my', verifyUser(['employee']), showRefoundsByUserController.handler);



refoundRoutes.delete('/:refoundId', verifyUser(['employee']), deleteRefoundController.handler);

// rotas privadas role manager
refoundRoutes.get('/', verifyUser(['manager']), indexController.handler);

refoundRoutes.get('/details/:refoundId', verifyUser(['manager']), showDetailsRefoundController.handler);

export { refoundRoutes };
