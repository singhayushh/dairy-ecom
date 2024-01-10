// server.ts

import { app } from './app';
import { appConfig } from './config/app.config';
import { connect, getConnectionState } from './config/db.config';
import { logger } from './utils/logger.util';

const startServer = async () => {
    const db = await connect(appConfig.MONGO_URI);

    if (String(process.env.NODE_ENV) !== 'test') {
        console.log(`${getConnectionState(db.connection.readyState)} to the database`);
        console.log(`Listening on ${appConfig.BASE_URL}:${appConfig.PORT}...`);
        logger.info(`Listening on ${appConfig.BASE_URL}:${appConfig.PORT}...`);
    }

    app.listen(appConfig.PORT, () => {
        app.emit('ready');
    });
};

startServer();
