/*
 * Author: Ayush Singh
 * File: db.config.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import mongoose from "mongoose";

/**
 * Connects the application to MongoDB and returns the connection instance.
 *
 * @param {string} connectionURI - The URI connection string.
 * @returns {Promise<typeof mongoose>} - The MongoDB connection instance.
 */
const connect = async (connectionURI: string): Promise<typeof mongoose> => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(connectionURI);
};

/**
 * Gets the human-readable stringified state of the MongoDB connection.
 *
 * @param {number} readyState - The numbered state of the MongoDB connection.
 * @returns {string} - The human-readable state of the MongoDB connection.
 */
const getConnectionState = (readyState: number): string => {
    const stateMap: Record<number, string> = {
        [mongoose.ConnectionStates.disconnected]: "Disconnected",
        [mongoose.ConnectionStates.connected]: "Connected",
        [mongoose.ConnectionStates.connecting]: "Connecting",
        [mongoose.ConnectionStates.disconnecting]: "Disconnecting",
        [mongoose.ConnectionStates.uninitialized]: "Uninitialized",
    };

    return stateMap[readyState] || "Unknown State";
};

/**
 * Checks whether the passed URI string is a valid MongoDB URI format.
 *
 * @param {string} connectionURI - The MongoDB connection URI.
 * @returns {boolean} - Returns true if the URI is valid; otherwise, false.
 */
const isValidConnectionURI = (connectionURI: string): boolean => {
    const validPrefixes = ["mongodb+srv://", "mongodb://"];
    return validPrefixes.some((prefix) => connectionURI.startsWith(prefix));
};

export { connect, getConnectionState, isValidConnectionURI };
