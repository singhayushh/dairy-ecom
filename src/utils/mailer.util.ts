/*
 * Author: Ayush Singh
 * File: mailer.util.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import env from "../config/env.config";
import { transporter } from "../config/mailer.config";
import { logger } from "./logger.util";

const sendMail = async (
    mailBody: string,
    mailSubject: string,
    receiverMail: string
) => {
    try {
        let mailOptions = {
            from: env.SENDER_MAIL,
            to: env.SENDER_MAIL,
            subject: mailSubject,
            html: mailBody,
        };
        const info = await transporter.sendMail(mailOptions);
        logger.info(`Email sent:", ${info.response}`);
        return true;
    } catch (error: any) {
        logger.error(`Error sending email: , #{error}`);
        return false;
    }
};

export { sendMail };
