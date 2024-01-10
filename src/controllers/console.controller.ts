/*
 * Author: Ayush Singh
 * File: console.controller.ts
 * Date: 2024-01-10
 *
 * Kindly refrain from removing or modifying the lines above to acknowledge the authorship.
 */

import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import * as orderService from "../services/order.service";

/**
 * Renders the dashboard page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const customers = await userService.fetchAllUser();
        const orders = await orderService.fetchAllOrder();
        return res.render("console/index", {
            customers,
            orders,
            user: res.locals.user,
            notifications: res.locals.notifications,
        });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

/**
 * Renders the users page.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 */
const RenderUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const customers = await userService.fetchAllUser();
        return res.render("console/users", {
            customers,
            user: res.locals.user,
            notifications: res.locals.notifications,
        });
        // eslint-disable-next-line
    } catch (error: any) {
        next(error);
    }
};

export { RenderDashboard, RenderUsers };
