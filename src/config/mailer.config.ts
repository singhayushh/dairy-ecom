/*
 * Author: Ayush Singh
 * File: mailer.config.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import nodemailer, { Transporter } from "nodemailer";
import env from "./env.config";

/**
 * Creates and configures a Nodemailer transporter using Gmail service.
 *
 * @remarks
 * Ensure that the environment variables SENDER_MAIL and SENDER_PASSWORD are set.
 *
 * @returns {Transporter} - The configured Nodemailer transporter.
 */
const createTransporter = (): Transporter => {
    const transporterOptions = {
        service: "gmail",
        auth: {
            user: env.SENDER_MAIL,
            pass: env.SENDER_PASSWORD,
        },
    };

    return nodemailer.createTransport(transporterOptions);
};

/**
 * Configured Nodemailer transporter for sending emails.
 */
const transporter: Transporter = createTransporter();

export { transporter };
