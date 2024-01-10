/*
 * Author: Ayush Singh
 * File: redis.config.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { createClient, RedisClientType } from "redis";
import env from "./env.config";

/**
 * Redis configuration parameters.
 */
const redisConfig = {
    password: env.REDIS_PASSWORD
        ? encodeURIComponent(String(env.REDIS_PASSWORD))
        : "",
    host: String(env.REDIS_HOST ?? "127.0.0.1"),
    port: Number(env.REDIS_PORT ?? 6379),
};

/**
 * Generate the Redis connection URL based on the configuration parameters.
 */
const generateRedisURL = () => {
    const { password, host, port } = redisConfig;
    return `redis://:${password}@${host}:${port}`;
};

/**
 * Create a Redis client using the generated connection URL.
 */
const redisClient: RedisClientType = createClient({ url: generateRedisURL() });

// Log the Redis connection status once it's ready
redisClient.on("ready", () => {
    // eslint-disable-next-line no-console
    console.log("Redis Connection Status: ready");
});

export { redisClient };
