/*
 * Author: Ayush Singh
 * File: validation.middleware.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { generateResponse } from "../utils/response.creator";

/**
 * Middleware for request validation using express-validator.
 *
 * @param req - Express Request interface
 * @param res - Express Response interface
 * @param next - Express NextFunction interface
 * @returns Response or proceeds to the next middleware or route handler
 */
const ValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    // Check for validation errors using express-validator
    const errors = validationResult(req);

    // If there are validation errors, generate a response with a 400 status code
    if (!errors.isEmpty()) {
        return generateResponse(
            res,
            400,
            { errors: errors.array() },
            "Required fields invalid or empty"
        );
    }

    // If there are no validation errors, proceed to the next middleware or route handler
    next();
};

export { ValidationMiddleware };
