/*
 * Author: Ayush Singh
 * File: transaction.controller.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Request, Response, NextFunction } from "express";
import { TransactionDto, TransactionUpdateDto } from "../dtos/transaction.dto";
import * as transactionService from "../services/transaction.service";

/**
 * Create controller adds a new transaction to the database
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns response with 201 status code and no body
 */
const Create = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Prepare data transfer object for transaction creation
        const dto: TransactionDto = { ...req.body };
        await transactionService.createTransaction(dto, res.locals.user._id);
        return res.redirect("/console/transactions?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Delete controller accepts transaction id from request params
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 202 status code with no body
 */
const Delete = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // servical call to delete the transaction by given id and return the deleted transaction
        const transaction = await transactionService.deleteTransaction(slug);

        // if returned transaction is null, which means incorrect transaction id
        if (!transaction) return res.redirect("/404");

        return res.redirect("/console/transactions?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchAll controller returns list of all transactions in non paginated format
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status code with paginated data in response body
 */
const FetchAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // service call to fetch all transactions
        const transactions = await transactionService.fetchAllTransaction(
            res.locals.user._id
        );

        return res.render("console/transactions", {
            transactions,
            user: res.locals.user,
            cart: res.locals.cart,
            notifications: res.locals.notifications,
        });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * FetchBySlug controller accepts slug from request params and returns the transaction document with given slug
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns 200 status with the transaction document in response body
 */
const FetchBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // service call to fetch transaction by given slug
        const transaction = await transactionService.fetchTransaction(
            String(slug)
        );

        // if transaction is null, which means incorrect transaction slug
        if (!transaction) return res.redirect("/404");

        return res.redirect(
            `/console/transactions/${transaction.slug}?message=success`
        );
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Update controller update the transaction with given id by the field passed in request body
 *
 * @param {Request} req express request interface
 * @param {Response} res express response interface
 * @returns  {Promise<Response | void>} 202 status with empty response body
 */
const Update = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { slug } = req.params;

        // store updateDto from request body, which filters out password and other non updatadable fields
        const dto: TransactionUpdateDto = { ...req.body };

        // service call to update transaction by given id and fields and return updated transaction
        const transaction = await transactionService.updateTransaction(
            slug,
            dto
        );

        // if returned transaction is null, which means incorrect transaction id
        if (!transaction) return res.redirect("/404");

        return res.redirect("/console/transactions?message=success");
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

export { Create, Delete, FetchAll, FetchBySlug, Update };
