import cors from 'cors';
import express from 'express';
import uploadConfig from '@/configs/upload';
import { errorHandler } from './middlewares/error-handler';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

// handeler de erro
app.use(errorHandler);

export { app };
