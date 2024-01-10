/*
 * Author: Ayush Singh
 * File: env.config.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { config } from "dotenv";
import { cleanEnv, num, str } from "envalid";
import path from "path";

// Determine the environment-specific .env file path
const envFileName = process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`
    : ".env.production";

// Determine the path to the env file
const envFilePath = path.resolve(__dirname, "..", "..", "..", envFileName);

// Load the env file
config({ path: envFilePath });

// Configure environment variables using 'cleanEnv' from a configuration object
const env = cleanEnv(process.env, {
    PROJECT_NAME: str(),
    PROJECT_DESC: str(),
    BASE_URL: str({ default: "http://127.0.0.1" }),
    PORT: num({ default: 3000 }),
    CONNECTION_URI: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
    CLOUDINARY_FOLDER_NAME: str(),
    SENDER_MAIL: str(),
    SENDER_PASSWORD: str(),
    REDIS_HOST: str({ default: "127.0.0.1" }),
    REDIS_PORT: num({ default: 6379 }),
    REDIS_PASSWORD: str({ default: "" }),
    SESSION_EXPIRY: num({ default: 84600 }),
});

export default env;
