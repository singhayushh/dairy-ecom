// app.config.ts

import * as dotenv from 'dotenv';

// Load environment variables based on the run command
if (!process.env.NODE_ENV) {
    dotenv.config({ path: `.env.production` });
} else {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}

import env from './env.config';

const appConfig = {
    PROJECT_NAME: String(env.PROJECT_NAME),
    MONGO_URI: String(env.CONNECTION_URI),
    BASE_URL: String(env.BASE_URL) || 'http://127.0.0.1',
    PORT: Number(env.PORT),
};

export { appConfig };
