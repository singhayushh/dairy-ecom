/*
 * Author: Ayush Singh
 * File: server.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { app } from "./app";
import { appConfig } from "./config/app.config";
import { connect, getConnectionState } from "./config/db.config";
import { redisClient } from "./config/redis.config";
import { logger } from "./utils/logger.util";

const startServer = async () => {
    const db = await connect(appConfig.MONGO_URI);
    await redisClient.connect();

    if (String(process.env.NODE_ENV) !== "test") {
        // eslint-disable-next-line
        console.log(
            `${getConnectionState(db.connection.readyState)} to the database`
        );

        // eslint-disable-next-line
        console.log(`Listening on ${appConfig.BASE_URL}:${appConfig.PORT}...`);
        logger.info(`Listening on ${appConfig.BASE_URL}:${appConfig.PORT}...`);
    }

    app.listen(appConfig.PORT, () => {
        app.emit("ready");
    });
};

startServer();
