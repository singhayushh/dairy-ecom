// app.ts

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { appConfig } from './config/app.config';
import { mainRouter } from './routes/main.route';
import { ErrorHandler } from './controllers/error.controller';
import path from 'path';
import { swaggerSpec } from './config/swagger.config';

const app: express.Application = express();
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ErrorHandler);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../static')));

app.get('/status', (_req: express.Request, res: express.Response) =>
    res.send(`${appConfig.PROJECT_NAME} server started on ${new Date()}`)
);

app.get('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', mainRouter);

export { app };
