/*
 * Author: Ayush Singh
 * File: error.controller.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.util";

/**
 * ErrorHandler is a custom middleware that handles any errors raised throughtout the lifetime of express app
 *
 * @param {Error} error error raised inside express app
 * @param {Request} _req express request interface
 * @param {Response} res express response interface
 * @param {NextFunction} _next express nextFunction interface
 */
const ErrorHandler = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    logger.error(error.message);
    res.render("500", { title: "500: Oops, something went wrong!" });
};

export { ErrorHandler };
